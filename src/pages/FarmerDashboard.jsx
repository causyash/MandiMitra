import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { PhoneCall, X, CheckCircle2, Info, MapPin, AlertCircle, Sparkles, SunMedium, ArrowRight, Clock, Truck, FileText, Sprout, TrendingUp, Check, ChevronRight, Calendar, Navigation } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FarmerDashboard = () => {
  const { t } = useTranslation();

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [activeNotification, setActiveNotification] = useState(null);

  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [selectedCentre, setSelectedCentre] = useState('करनाल गेट-2 (Karnal Gate-2)');

  const handleStartBooking = (centreName) => {
    if (centreName) setSelectedCentre(centreName);
    setBookingConfirmed(false);
    setSelectedCrop(null);
    setShowBookingModal(true);
  };

  const recommendedCentres = [
    {
      id: 1,
      name: 'करनाल गेट-2 (Karnal Gate-2)',
      distance: '8 किमी (8 km)',
      waitMinutes: '15 मिनट (15 mins)',
      waitColor: 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 border-emerald-300 dark:border-emerald-700',
      capacityStatus: '70% (उपलब्ध)',
      availableSlot: 'सुबह (Morning) • 8 स्लॉट बचे',
      isBest: true,
      reasons: [
        'सबसे कम प्रतीक्षा समय (Lowest wait time)',
        'आपकी गेहूं फसल के लिए निर्धारित (For Wheat crop)',
        'हवाई नंबर-2 के पास (Near Highway No-2)',
      ],
    },
    {
      id: 2,
      name: 'नीलोखेरी अनाज मंडी (Nilokheri Grain Mandi)',
      distance: '15 किमी (15 km)',
      waitMinutes: '45 मिनट (45 mins)',
      waitColor: 'bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 border-amber-300 dark:border-amber-700',
      capacityStatus: '45% (उपलब्ध)',
      availableSlot: 'दोपहर (Afternoon) • 12 स्लॉट',
      isBest: false,
    },
    {
      id: 3,
      name: 'राजेंद्र अनाज मंडी (Rajendra Grain Mandi)',
      distance: '22 किमी (22 km)',
      waitMinutes: '2 घंटे (2 hrs)',
      waitColor: 'bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200 border-rose-300 dark:border-rose-700',
      capacityStatus: '95% (लगभग भरा)',
      availableSlot: 'शाम (Evening) • 2 स्लॉट',
      isBest: false,
    },
  ];

  const currentBooking = {
    tokenNumber: 'BK12345',
    crop: 'गेहूं (Wheat)',
    quantity: '40 क्विंटल (40 Quintals)',
    centre: 'करनाल गेट-2 (Karnal Gate-2)',
    date: '05 सितंबर 2026 (Sep 5, 2026)',
    slotTime: 'सुबह (Morning)',
    status: 'पुष्ट (Confirmed)',
    queueAhead: '4 गाड़ियाँ आगे (4 trucks ahead)',
    estimatedWait: '~15 मिनट (15 mins)',
  };

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      {/* Toast alert feedback if any */}
      <AnimatePresence>
        {activeNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-4 z-50 bg-emerald-800 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-emerald-700"
          >
            <CheckCircle2 className="h-5 w-5 text-emerald-300 shrink-0" />
            <span className="text-sm font-semibold">{activeNotification}</span>
            <button
              onClick={() => setActiveNotification(null)}
              className="ml-3 hover:bg-emerald-700/50 p-1 rounded-md cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SAMPLE DATA / PROTOTYPE NOTICE (Clear disclaimer that this is demo data) */}
      <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs text-amber-900 dark:text-amber-200">
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 text-amber-600 shrink-0" />
          <span>
            <strong>डेमो प्रोटोटाइप (Demo Prototype):</strong> प्रदर्शित सभी आंकड़े (प्रतीक्षा समय, क्षमता व भाव) केवल नमूना प्रदर्शन हेतु हैं। (Sample data for preview).
          </span>
        </div>
        <span className="font-semibold px-2 py-0.5 rounded bg-amber-200/80 dark:bg-amber-900 text-[11px] shrink-0 ml-2">
          नमूना डेटा (Demo)
        </span>
      </div>

      {/* 1. WELCOME SECTION (Simple Greeting & Location) */}
      <section className="bg-card rounded-2xl p-5 sm:p-6 border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
              <MapPin className="h-3.5 w-3.5" />
              करनाल, हरियाणा (Karnal, Haryana)
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              • आज: 04 सितंबर 2026
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            राम-राम, रमेश जी! <span className="text-lg sm:text-xl font-normal text-muted-foreground">(Welcome, Ramesh ji)</span>
          </h1>
          <p className="text-sm text-muted-foreground">
            मंडीमित्र में अपनी फसल बेचने के लिए सीधे टोकन बुक करें और बिना लाइन लगे समय पर पहुंचें।
          </p>
        </div>

        <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-3 sm:pt-0 border-muted">
          <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-600 animate-pulse" />
            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
              खरीद केंद्र चालू हैं (Centres Active)
            </span>
          </div>
        </div>
      </section>

      {/* 2. PRIMARY ACTION CARD (VISUALLY DOMINANT: "Sell Your Produce / अपनी उपज बेचें") */}
      <section>
        <div className="rounded-2xl border-3 border-emerald-600 bg-gradient-to-br from-emerald-600/10 via-card to-emerald-500/10 dark:from-emerald-950/40 dark:via-card dark:to-emerald-900/20 p-6 sm:p-8 shadow-lg ring-2 ring-emerald-600/20">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                मुख्य काम (Your Primary Action)
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground tracking-tight">
                अपनी उपज बेचें (Sell Your Produce)
              </h2>

              <p className="text-base sm:text-lg text-foreground/80 font-medium max-w-2xl leading-relaxed">
                मंडी जाने से पहले अपनी ट्रॉली / गाड़ी का समय बुक करें। बिना किसी कतार के सीधे मंडी गेट में प्रवेश पाएं।
              </p>

              {/* 3-Step Guided Visual Flow for Low-Literacy Farmers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 text-xs font-semibold text-foreground/80">
                <div className="bg-background/80 dark:bg-muted/40 p-2.5 rounded-lg border flex items-center gap-2">
                  <span className="h-6 w-6 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 flex items-center justify-center font-bold text-xs shrink-0">1</span>
                  <span>फसल चुनें (Pick Crop)</span>
                </div>
                <div className="bg-background/80 dark:bg-muted/40 p-2.5 rounded-lg border flex items-center gap-2">
                  <span className="h-6 w-6 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 flex items-center justify-center font-bold text-xs shrink-0">2</span>
                  <span>मंडी व दिन चुनें (Pick Mandi)</span>
                </div>
                <div className="bg-background/80 dark:bg-muted/40 p-2.5 rounded-lg border flex items-center gap-2">
                  <span className="h-6 w-6 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 flex items-center justify-center font-bold text-xs shrink-0">3</span>
                  <span>गेट टोकन पाएं (Get Pass)</span>
                </div>
              </div>
            </div>

            {/* Huge Touch-Friendly Primary CTA Button */}
            <div className="shrink-0 flex flex-col items-center lg:items-end gap-2 w-full lg:w-auto">
              <Button
                size="lg"
                onClick={() => handleStartBooking()}
                className="w-full sm:w-auto min-h-[60px] text-lg sm:text-xl font-bold py-5 px-10 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-3 cursor-pointer ring-4 ring-emerald-500/20"
              >
                <span>स्लॉट बुक करें (Book Mandi Slot)</span>
                <ArrowRight className="h-6 w-6 stroke-[3]" />
              </Button>
              <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                1 मिनट में पक्की बुकिंग • बिना दलाल
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CURRENT ACTIVE BOOKING CARD */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
            <FileText className="h-5 w-5 text-emerald-600" />
            <span>आपकी वर्तमान सक्रिय बुकिंग (Current Booking)</span>
          </h2>
          <span className="text-xs text-muted-foreground font-mono font-medium">
            टोकन: {currentBooking.tokenNumber}
          </span>
        </div>

        <Card className="border-l-6 border-l-emerald-600 shadow-sm overflow-hidden">
          <div className="p-5 sm:p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 flex items-center justify-center text-emerald-800 dark:text-emerald-200 font-bold shrink-0">
                  <Sprout className="h-7 w-7 text-emerald-700 dark:text-emerald-300" />
                </div>
                <div>
                  <div className="font-extrabold text-lg sm:text-xl text-foreground">
                    {currentBooking.crop}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground font-medium">
                    कुल मात्रा: <strong>{currentBooking.quantity}</strong>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-200 text-sm font-bold px-3.5 py-1.5 rounded-full border border-emerald-300 dark:border-emerald-700">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  {currentBooking.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
              <div className="bg-muted/40 p-3.5 rounded-xl border border-border/60 space-y-1">
                <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-emerald-600" />
                  खरीद केंद्र (Mandi Centre)
                </span>
                <p className="font-bold text-foreground text-sm sm:text-base">
                  {currentBooking.centre}
                </p>
              </div>

              <div className="bg-muted/40 p-3.5 rounded-xl border border-border/60 space-y-1">
                <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-emerald-600" />
                  तय तिथि (Scheduled Date)
                </span>
                <p className="font-bold text-foreground text-sm sm:text-base">
                  {currentBooking.date}
                </p>
              </div>

              <div className="bg-muted/40 p-3.5 rounded-xl border border-border/60 space-y-1">
                <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-emerald-600" />
                  प्रवेश समय (Slot Time)
                </span>
                <p className="font-bold text-emerald-700 dark:text-emerald-400 text-sm sm:text-base">
                  {currentBooking.slotTime}
                </p>
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-950/40 p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-800/80 space-y-1">
                <span className="text-xs text-emerald-900 dark:text-emerald-300 font-semibold flex items-center gap-1">
                  <Truck className="h-3.5 w-3.5" />
                  लाइव स्थिति (Gate Status)
                </span>
                <p className="font-bold text-emerald-900 dark:text-emerald-100 text-sm">
                  {currentBooking.queueAhead}
                </p>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                  प्रतीक्षा: {currentBooking.estimatedWait} (नमूना अनुमान)
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <p className="text-xs text-muted-foreground">
                💡 निर्धारित समय पर गेट नंबर 2 पर रिपोर्ट करें। गाड़ी नंबर: <strong>HR-05-TG-8842</strong>
              </p>
              <Button
                variant="outline"
                size="md"
                onClick={() => setShowTrackingModal(true)}
                className="w-full sm:w-auto min-h-[44px] font-bold flex items-center justify-center gap-2 border-emerald-600 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 cursor-pointer"
              >
                <Navigation className="h-4 w-4" />
                <span>लाइव कतार देखें (Track Queue)</span>
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* 4. SMART RECOMMENDATION SECTION (Clear "Why We Recommend This") */}
      <section className="space-y-4">
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-500" />
              <span>सुझाई गई मंडियां (Smart Mandi Recommendations)</span>
            </h2>
            <span className="text-[11px] font-semibold text-muted-foreground bg-muted px-2.5 py-1 rounded-md">
              दूरी व कतार के आधार पर (Sample Preview)
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            कम प्रतीक्षा समय और आसान स्लॉट उपलब्धता वाली मंडियों की सूची।
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {recommendedCentres.map((centre) => (
            <Card
              key={centre.id}
              className={`relative overflow-hidden transition-all duration-200 hover:shadow-md flex flex-col justify-between ${
                centre.isBest
                  ? 'border-2 border-emerald-600 bg-emerald-50/25 dark:bg-emerald-950/25 shadow-md ring-2 ring-emerald-600/20'
                  : 'border-border bg-card'
              }`}
            >
              <div>
                {centre.isBest && (
                  <div className="bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 text-center tracking-wide flex items-center justify-center gap-1.5 shadow-sm">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>⭐ सर्वोत्तम पसंद: सबसे कम प्रतीक्षा (Fastest)</span>
                  </div>
                )}

                <CardHeader className={centre.isBest ? 'pt-4 pb-2' : 'pt-5 pb-2'}>
                  <CardTitle className="text-base sm:text-lg font-bold leading-snug">
                    {centre.name}
                  </CardTitle>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                    <span>दूरी: <strong>{centre.distance}</strong> (खेत से दूरी)</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3 pt-0">
                  <div className="space-y-2 border-t pt-3 text-xs">
                    {/* Predicted Waiting Time */}
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground flex items-center gap-1 font-medium">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        अनुमानित प्रतीक्षा (Wait Time):
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-bold border ${centre.waitColor}`}
                      >
                        {centre.waitMinutes}
                      </span>
                    </div>

                    {/* Available Capacity */}
                    <div className="flex justify-between items-center">
                    <span className="text-muted-foreground font-medium">क्षमता (Capacity):</span>
                      <span className="font-bold text-foreground">
                        {centre.capacityStatus}
                      </span>
                    </div>

                    {/* Available Slot */}
                    <div className="flex justify-between items-center">
                    <span className="text-muted-foreground font-medium">स्लॉट स्थिति (Slot):</span>
                      <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                        {centre.availableSlot}
                      </span>
                    </div>
                  </div>

                  {/* Short "Why We Recommend This" Box for the Best Mandi */}
                  {centre.isBest && centre.reasons && (
                    <div className="bg-emerald-100/70 dark:bg-emerald-900/40 p-3 rounded-xl border border-emerald-300 dark:border-emerald-700 text-xs space-y-1.5 mt-2">
                      <div className="font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700 dark:text-emerald-400" />
                        <span>सिफारिश का कारण (Why we recommend this):</span>
                      </div>
                      <ul className="space-y-1 text-emerald-900 dark:text-emerald-300 pl-4 list-disc font-medium">
                        {centre.reasons.map((reason, idx) => (
                          <li key={idx}>{reason}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </div>

              <div className="p-6 pt-0 mt-2">
                <Button
                  variant={centre.isBest ? 'primary' : 'outline'}
                  size="md"
                  onClick={() => handleStartBooking(centre.name)}
                  className={`w-full min-h-[44px] font-bold flex items-center justify-center gap-2 cursor-pointer ${
                    centre.isBest
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
                      : ''
                  }`}
                >
                  <span>यह मंडी चुनें (Book This Mandi)</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 5. QUICK ACTIONS (4 Simple Large Touch Buttons) */}
      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
          <span>त्वरित सेवाएं (Quick Actions)</span>
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <button
            onClick={() => handleStartBooking()}
            className="flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl border bg-card hover:bg-accent hover:border-emerald-500/50 transition-all text-card-foreground shadow-sm group cursor-pointer min-h-[110px] justify-center"
          >
            <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <MapPin className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>
            <span className="font-bold text-sm sm:text-base text-foreground">मंडी खोजें</span>
            <span className="text-xs text-muted-foreground">Find Mandi</span>
          </button>

          <button
            onClick={() => {
              setActiveNotification(t('notification.active.booking'));
            }}
            className="flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl border bg-card hover:bg-accent hover:border-emerald-500/50 transition-all text-card-foreground shadow-sm group cursor-pointer min-h-[110px] justify-center"
          >
            <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <FileText className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>
            <span className="font-bold text-sm sm:text-base text-foreground">मेरी बुकिंग</span>
            <span className="text-xs text-muted-foreground">My Bookings</span>
          </button>

          <button
            onClick={() => setShowTrackingModal(true)}
            className="flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl border bg-card hover:bg-accent hover:border-emerald-500/50 transition-all text-card-foreground shadow-sm group cursor-pointer min-h-[110px] justify-center"
          >
            <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <Truck className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>
            <span className="font-bold text-sm sm:text-base text-foreground">कतार देखें</span>
            <span className="text-xs text-muted-foreground">Track Queue</span>
          </button>

          <button
            onClick={() => setShowHelpModal(true)}
            className="flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl border bg-card hover:bg-accent hover:border-emerald-500/50 transition-all text-card-foreground shadow-sm group cursor-pointer min-h-[110px] justify-center"
          >
            <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <PhoneCall className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>
            <span className="font-bold text-sm sm:text-base text-foreground">किसान सहायता</span>
            <span className="text-xs text-muted-foreground">Helpdesk (1800)</span>
          </button>
        </div>
      </section>

      {/* 6. REDUCED INFORMATION OVERLOAD: COMPACT ADVISORY BAR */}
      <section className="bg-muted/30 rounded-xl p-4 border border-border/80 text-xs text-muted-foreground space-y-2">
        <div className="flex items-center justify-between font-semibold text-foreground">
          <span className="flex items-center gap-1.5 text-xs">
            <AlertCircle className="h-4 w-4 text-emerald-600" />
            किसान सूचना एवं सलाह (Farmer Reminders & Advisory)
          </span>
          <span className="text-[11px] text-muted-foreground font-normal">
            नमूना सूचना (Demo advisory)
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
          <div className="flex items-center gap-2 bg-background/60 p-2 rounded-lg border border-border/60">
            <SunMedium className="h-4 w-4 text-amber-500 shrink-0" />
            <span><strong>मौसम:</strong> अगले 3 दिन मौसम साफ रहेगा (Clear weather)</span>
          </div>
          <div className="flex items-center gap-2 bg-background/60 p-2 rounded-lg border border-border/60">
            <TrendingUp className="h-4 w-4 text-blue-500 shrink-0" />
            <span><strong>गेहूं MSP (नमूना):</strong> ₹2,275/क्विंटल (सीधे बैंक खाते में)</span>
          </div>
          <div className="flex items-center gap-2 bg-background/60 p-2 rounded-lg border border-border/60">
            <FileText className="h-4 w-4 text-emerald-500 shrink-0" />
            <span><strong>टोकन साथ रखें:</strong> गेट पर SMS या पर्ची दिखाएं</span>
          </div>
        </div>
      </section>

      {/* INTERACTIVE MODAL 1: Guided Booking Flow */}
      <AnimatePresence>
        {showBookingModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-background rounded-2xl max-w-lg w-full p-6 shadow-2xl border space-y-5"
            >
              <div className="flex justify-between items-center border-b pb-3">
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
                    <Sprout className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">
                    {bookingConfirmed
                      ? t('modal.booking.title.confirm')
                      : t('modal.booking.title.book')}
                  </h3>
                </div>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="p-1.5 rounded-md text-muted-foreground hover:bg-accent cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {!bookingConfirmed ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-foreground block mb-1.5">
                      {t('booking.form.step.crop.label')}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[t('crops.wheat'), t('crops.mustard'), t('crops.paddy'), t('crops.maize')].map(
                        (crop) => (
                          <button
                            key={crop}
                            type="button"
                            onClick={() => setSelectedCrop(crop)}
                            className={`p-3 rounded-xl border text-left text-sm font-semibold transition-all min-h-[46px] cursor-pointer ${
                              selectedCrop === crop
                                ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-600/30 font-bold'
                                : 'border-border hover:bg-accent text-foreground'
                            }`}
                          >
                            {crop}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-foreground block mb-1.5">
                      {t('booking.form.step.centre.label')}
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={selectedCentre}
                      className="w-full p-3 rounded-xl border bg-muted text-sm font-bold text-foreground focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-foreground block mb-1.5">
                      {t('booking.form.step.slot.label')}
                    </label>
                    <div className="p-3 rounded-xl border bg-card text-sm font-semibold flex items-center justify-between">
                      <span>06 सितंबर 2026 (सुबह 08:00 - 10:00 AM)</span>
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold text-xs bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded">
                        {t('status.available')}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button
                      size="lg"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 text-base rounded-xl min-h-[52px] cursor-pointer"
                      onClick={() => {
                        setBookingConfirmed(true);
                      }}
                    >
                      <span>स्लॉट पक्का करें (Confirm Booking)</span>
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 space-y-4">
                  <div className="h-16 w-16 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 rounded-full flex items-center justify-center mx-auto">
                    <Check className="h-9 w-9 stroke-[3]" />
                  </div>
                  <div>
                    <h4 className="text-xl font-extrabold text-foreground">
                      {t('notification.success.booking.title')}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      टोकन कोड: <strong className="text-foreground">#MM-2026-9104</strong> ({t('token.sample')})
                    </p>
                  </div>
                  <div className="bg-muted p-4 rounded-xl text-left text-xs space-y-2">
                    <div>
                      <strong>फसल:</strong> {selectedCrop}
                    </div>
                    <div>
                      <strong>खरीद केंद्र:</strong> {selectedCentre}
                    </div>
                    <div>
                      <strong>दिनांक:</strong> 06 सितंबर 2026 ({t('booking.time.morning')})
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full min-h-[44px] font-bold cursor-pointer"
                    onClick={() => {
                      setShowBookingModal(false);
                      setActiveNotification(t('notification.new.booking.added'));
                    }}
                  >
                    {t('button.back.to.dashboard')}
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* INTERACTIVE MODAL 2: Live Queue Tracker */}
      <AnimatePresence>
        {showTrackingModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-background rounded-2xl max-w-lg w-full p-6 shadow-2xl border space-y-5"
            >
              <div className="flex justify-between items-center border-b pb-3">
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                    <Truck className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      {t('modal.queue.title.live')}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      करनाल मुख्य अनाज मंडी - Gate 2
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowTrackingModal(false)}
                  className="p-1.5 rounded-md text-muted-foreground hover:bg-accent cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-1">
                  <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                    {t('yourVehicleToken')}
                  </span>
                  <div className="text-2xl font-black text-emerald-900 dark:text-emerald-100">
                    #MM-2026-8842
                  </div>
                  <div className="text-sm font-bold text-emerald-700 dark:text-emerald-400">
                    {t('positionInQueue', 'कतार में स्थान: 5वां (4 गाड़ियां आगे)')}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {t('estimatedWaitLabel')} <strong>~15 मिनट</strong> (नमूना अनुमान)
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-foreground">
                    {t('queueProgressionTitle')}
                  </span>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-100/60 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 font-semibold">
                    <span>{t('vehicleStatusWeighing')}</span>
                      <span className="text-[11px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded">
                        {t('insideGate')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-muted font-medium text-muted-foreground">
                      <span>गाड़ी HR-05-XY-4421 (दस्तावेज़ जांच)</span>
                      <span className="text-[11px]">{t('atGate')}</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border-2 border-emerald-500 font-bold text-emerald-900 dark:text-emerald-100">
                      <span>⭐ आपकी गाड़ी: HR-05-TG-8842</span>
                      <span className="text-[11px] bg-emerald-600 text-white px-2 py-0.5 rounded">
                        {t('nextTurn')}
                      </span>
                    </div>
                  </div>
                </div>

                  <Button
                    variant="outline"
                    className="w-full min-h-[44px] font-bold cursor-pointer"
                    onClick={() => setShowTrackingModal(false)}
                  >
                    {t('closeTrackerBtn')}
                  </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* INTERACTIVE MODAL 3: Kisan Helpline */}
      <AnimatePresence>
        {showHelpModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-background rounded-2xl max-w-md w-full p-6 shadow-2xl border space-y-5"
            >
              <div className="flex justify-between items-center border-b pb-3">
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 rounded-lg bg-rose-600 text-white flex items-center justify-center">
                    <PhoneCall className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">
                    किसान सहायता केंद्र (Kisan Helpdesk)
                  </h3>
                </div>
                <button
                  onClick={() => setShowHelpModal(false)}
                  className="p-1.5 rounded-md text-muted-foreground hover:bg-accent cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-muted text-center space-y-1">
                  <span className="text-xs text-muted-foreground font-medium">
                    {t('tollFreeLabel')}
                  </span>
                  <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400">
                    1800-180-1551
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {t("workingHours")}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-xl border flex items-center justify-between">
                    <div>
                      <p className="font-bold text-foreground">{t('karnalMandiHelpdesk')}</p>
                      <p className="text-muted-foreground">{t('nodeOfficer')}</p>
                    </div>
                    <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">
                      +91 98120-XXXXX
                    </span>
                  </div>

                  <div className="p-3 rounded-xl border flex items-center justify-between">
                    <div>
                      <p className="font-bold text-foreground">{t('whatsappSupport')}</p>
                      <p className="text-muted-foreground">{t('whatsappDesc')}</p>
                    </div>
                    <span className="bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 text-[11px] font-bold px-2 py-0.5 rounded">
                      {t('available')}
                    </span>
                  </div>
                </div>

                  <Button
                    variant="outline"
                    className="w-full min-h-[44px] font-bold cursor-pointer"
                    onClick={() => setShowHelpModal(false)}
                  >
                    {t('gotItBtn')}
                  </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default FarmerDashboard;
