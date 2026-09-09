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
  const { nameEn, nameHi, slug, district, state } = req.body;
  const mandi = await prisma.mandi.create({
    data: { nameEn, nameHi, slug, district, state },
  });
  res.status(201).json(mandi);
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