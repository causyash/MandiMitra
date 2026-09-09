require('dotenv').config();
const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = 4000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('MandiMitra backend is running!');
});

app.get('/crops', async (req, res) => {
  const crops = await prisma.crop.findMany();
  res.json(crops);
});

app.post('/crops', async (req, res) => {
  const { nameEn, nameHi, slug, mspPerQuintal } = req.body;
  const crop = await prisma.crop.create({
    data: { nameEn, nameHi, slug, mspPerQuintal },
  });
  res.status(201).json(crop);
});

app.get('/mandis', async (req, res) => {
  const mandis = await prisma.mandi.findMany();
  res.json(mandis);
});

app.post('/mandis', async (req, res) => {
  const { nameEn, nameHi, slug, district, state, latitude, longitude } = req.body;
  const mandi = await prisma.mandi.create({
    data: { nameEn, nameHi, slug, district, state, latitude, longitude },
  });
  res.status(201).json(mandi);
});

app.get('/mandis/:id/weather', async (req, res) => {
  const mandi = await prisma.mandi.findUnique({
    where: { id: Number(req.params.id) },
  });

  if (!mandi) {
    return res.status(404).json({ error: 'Mandi not found' });
  }

  if (mandi.latitude == null || mandi.longitude == null) {
    return res.status(400).json({ error: 'This mandi has no location coordinates saved yet' });
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${mandi.latitude}&lon=${mandi.longitude}&appid=${process.env.OPENWEATHERMAP_API_KEY}&units=metric`;

  const weatherRes = await fetch(url);
  const weatherData = await weatherRes.json();

  if (!weatherRes.ok) {
    return res.status(weatherRes.status).json({ error: 'Weather service error', details: weatherData });
  }

  res.json({
    mandi: mandi.nameEn,
    temperatureCelsius: weatherData.main.temp,
    feelsLikeCelsius: weatherData.main.feels_like,
    humidityPercent: weatherData.main.humidity,
    windSpeedMetersPerSecond: weatherData.wind.speed,
    condition: weatherData.weather[0].main,
    conditionDescription: weatherData.weather[0].description,
    fetchedAt: new Date().toISOString(),
  });
});

app.get('/mandis/:mandiId/crops/:cropId/price', async (req, res) => {
  const mandi = await prisma.mandi.findUnique({ where: { id: Number(req.params.mandiId) } });
  const crop = await prisma.crop.findUnique({ where: { id: Number(req.params.cropId) } });

  if (!mandi) {
    return res.status(404).json({ error: 'Mandi not found' });
  }
  if (!crop) {
    return res.status(404).json({ error: 'Crop not found' });
  }

  const params = new URLSearchParams({
    'api-key': process.env.DATA_GOV_IN_API_KEY,
    format: 'json',
    limit: '10',
    'filters[commodity]': crop.nameEn,
    'filters[state.keyword]': mandi.state,
    'filters[district]': mandi.district,
  });

  const url = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?${params.toString()}`;

  const priceRes = await fetch(url);
  const priceData = await priceRes.json();

  if (!priceRes.ok) {
    return res.status(priceRes.status).json({ error: 'Price service error', details: priceData });
  }

  if (!priceData.records || priceData.records.length === 0) {
    return res.status(404).json({
      error: 'No live price records reported for this crop/district combination right now',
      crop: crop.nameEn,
      district: mandi.district,
      state: mandi.state,
    });
  }

  const latest = priceData.records[0];

  res.json({
    crop: crop.nameEn,
    mandi: mandi.nameEn,
    market: latest.market,
    variety: latest.variety,
    arrivalDate: latest.arrival_date,
    minPriceRsPerQuintal: Number(latest.min_price),
    maxPriceRsPerQuintal: Number(latest.max_price),
    modalPriceRsPerQuintal: Number(latest.modal_price),
    mspPerQuintal: crop.mspPerQuintal,
    fetchedAt: new Date().toISOString(),
  });
});

app.post('/chatbot/message', async (req, res) => {
  const { message, farmerPhone } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'message is required' });
  }

  let contextText =
    'You are a helpful assistant for MandiMitra, an app that helps Indian farmers book mandi (market) slots, see live crop prices, and check weather. Answer briefly and clearly, in the same language the farmer writes in (English or Hindi).';

  if (farmerPhone) {
    const bookings = await prisma.booking.findMany({
      where: { farmerPhone },
      include: { crop: true, mandi: true },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    if (bookings.length > 0) {
      const bookingSummary = bookings
        .map(
          (b) =>
            `Token ${b.tokenNumber}: ${b.quantityQuintal} quintals of ${b.crop.nameEn} at ${b.mandi.nameEn}, slot date ${b.slotDate.toDateString()}, status ${b.status}`
        )
        .join('\n');
      contextText += `\n\nThis farmer's real recent bookings:\n${bookingSummary}`;
    } else {
      contextText += `\n\nThis farmer has no bookings yet.`;
    }
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`;

  const geminiRes = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        {
          role: 'user',
          parts: [{ text: `${contextText}\n\nFarmer's question: ${message}` }],
        },
      ],
    }),
  });

  const geminiData = await geminiRes.json();

  if (!geminiRes.ok) {
    return res.status(geminiRes.status).json({ error: 'Chatbot service error', details: geminiData });
  }

  const replyText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.';

  res.json({
    reply: replyText,
    fetchedAt: new Date().toISOString(),
  });
});

function generateBookingToken() {
  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `MM-${year}-${random}`;
}

app.post('/bookings', async (req, res) => {
  const { farmerName, farmerPhone, cropId, mandiId, quantityQuintal, slotDate } = req.body;
  const booking = await prisma.booking.create({
    data: {
      tokenNumber: generateBookingToken(),
      farmerName,
      farmerPhone,
      cropId,
      mandiId,
      quantityQuintal,
      slotDate: new Date(slotDate),
    },
    include: { crop: true, mandi: true },
  });
  res.status(201).json(booking);
});

app.get('/bookings', async (req, res) => {
  const bookings = await prisma.booking.findMany({
    include: { crop: true, mandi: true },
  });
  res.json(bookings);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});