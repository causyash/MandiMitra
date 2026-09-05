export function getTranslationKey(key, defaultValue = '') {
  try {
    if (window._i18n && window.__i18n_lng) {
      const translations = window._i18n.getResource(window.__i18n_lng, 'translation');
      return translations?.[key] || defaultValue;
    }
  } catch {}
  return defaultValue;
}

function getDefaultText(key) {
  const texts = {
    // Greeting & Welcome
    farmerWelcome: 'राम-राम, <user>! (<span class="text-muted-foreground">(Welcome, <user>)</span>)',
    
    welcomeMessage: 'मंडीमित्र में अपनी फसल बेचने के लिए सीधे टोकन बुक करें और बिना लाइन लगे समय पर पहुंचें।',

    centresActive: 'खरीद केंद्र चालू हैं (Centres Active)',
    
    // Locations
    locationBadge: 'करनाल, हरियाणा (Karnal, Haryana)',
    currentDate: 'आज: 04 सितंबर 2026',

    // Demo notices
    demoPrototypeTitle: 'डेमो प्रोटोटाइप (Demo Prototype):',
    demoPrototypeDesc: 'प्रदर्शित सभी आंकड़े (प्रतीक्षा समय, क्षमता व भाव) केवल नमूना प्रदर्शन हेतु हैं। (Sample data for preview).',
    sampleDataBadge: 'नमूना डेटा (Demo)',

    // Booking Modal labels
    bookingModalTitleBook: 'उपज स्लॉट बुकिंग (Book Mandi Slot)',
    bookingModalTitleConfirm: 'बुकिंग सफल (Booking Confirmed!)',
    
    selectCropLabel: '1. फसल चुनें (Select Crop):',
    selectCentreLabel: '2. चयनित खरीद केंद्र (Procurement Centre):',
    
    cropSelected: '<span class="text-emerald-600 dark:text-emerald-400 font-bold">{crop}</span> चुना गया!',

    bookingSuccessTitle: 'अपका स्लॉट सफलतापूर्वक बुक हो गया!',
    bookingSuccessToken: 'टोकन कोड: <token>',
    bookingSuccessDate: '<date>',

    returnToDashboard: 'डैशबोर्ड पर वापस जाएं (Back to Dashboard)',
    newBookingAdded: 'नई बुकिंग सफलतापूर्वक जोड़ दी गई!',

    // Menu buttons
    findMandiButton: 'मंडी खोजें',
    findMandiDesc: 'Find Mandi',
    
    myBookingsButton: 'मेरी बुकिंग',
    myBookingsDesc: 'My Bookings',
    
    trackQueueButton: 'कतार देखें',
    trackQueueDesc: 'Track Queue',
    
    helpDeskButton: 'किसान सहायता',
    helpDeskDesc: 'Helpdesk (1800)',

    // Tracking card & modal
    trackQueueBtnText: 'लाइव कतार देखें (Track Queue)',
    smartMandiTitle: 'सुझाई गई मंडियां (Smart Mandi Recommendations)',
    smartMandiDesc: 'कम प्रतीक्षा समय और आसान स्लॉट उपलब्धता वाली मंडियों की सूची।',
    distanceBadge: 'दूरी व कतार के आधार पर (Sample Preview)',
    
    bestRecommendation: '⭐ सर्वोत्तम पसंद: सबसे कम प्रतीक्षा (Fastest)',

    mandiCentreLabel: 'खरीद केंद्र (Mandi Centre)',
    scheduledDateLabel: 'तय तिथि (Scheduled Date)',
    slotTimeLabel: 'प्रवेश समय (Slot Time)',
    gateStatusLabel: 'लाइव स्थिति (Gate Status)',

    waitTimeLabel: 'अनुमानित प्रतीक्षा (Wait Time):',
    
    // Advisory bar
    farmerReminders: 'किसान सूचना एवं सलाह (Farmer Reminders & Advisory)',
    demoAdvisory: 'नमूना सूचना (Demo advisory)',

    // Weather info
    weatherLabel: 'मौसम:',
    weatherClear: 'अगले 3 दिन मौसम साफ रहेगा (Clear weather)',

    mspLabel: 'गेहूं MSP (नमूना):',
    
    tokenReminder: 'टोकन साथ रखें:',
    tokenInstructions: 'गेट पर SMS या पर्ची दिखाएं',

    // Tracking modal
    trackingModalTitle: 'लाइव कतार स्थिति (Live Gate Queue Tracker)',
    trackingSubTitle: 'करनाल मुख्य अनाज मंडी - Gate 2',
    
    yourVehicleToken: 'आपकी गाड़ी का टोकन',
    positionInQueue: 'कतार में स्थान: {position}वां ({count} गाड़ियां आगे)',
    estimatedWaitLabel: 'अनुमानित प्रतीक्षा समय:',

    queueProgressionTitle: 'कतार प्रगति (Gate Queue Progression):',
    insideGate: 'गेट के अंदर',
    atGate: 'गेट पर',
    nextTurn: 'अगली बारी',
    
    closeTrackerBtn: 'बंद करें (Close Tracker)',

    // Helpdesk modal
    helpdeskModalTitle: 'किसान सहायता केंद्र (Kisan Helpdesk)',
    tollFreeLabel: 'निःशुल्क टोल-फ्री नंबर',
    workingHours: '(सुबह 6:00 बजे से रात 10:00 बजे तक)',

    karnalMandiHelpdesk: 'करनाल मंडी सहायता डेस्क',
    nodeOfficer: 'Gate 2 नोडल अधिकारी',

    whatsappSupport: 'व्हाट्सएप सहायता (WhatsApp)',
    whatsappDesc: 'मैसेज भेजकर तुरंत जानकारी पाएं',
    
    available: 'उपलब्ध',
    
    gotItBtn: 'ठीक है (Got It)',

    // Toast notifications
    bookingSuccessToast: '<count> सक्रिय बुकिंग है: टोकन #{token}',
    newBookingToast: 'नई बुकिंग सफलतापूर्वक जोड़ दी गई!',

    // Booking form options
    bookSlotBtn: 'बुक करें',
    viewDetailsBtn: 'विवरण देखें',
  };

  return texts[key] || defaultValue;
}

export default { getTranslationKey, getDefaultText };