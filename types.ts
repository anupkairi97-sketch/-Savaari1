export type Language = 'en' | 'hi' | 'bn' | 'as';

export interface TranslationSet {
  welcome: string;
  chooseRole: string;
  passenger: string;
  driver: string;
  selectLanguage: string;
  continue: string;
  enterPhone: string;
  phonePlaceholder: string;
  sendOTP: string;
  enterOTP: string;
  verifyOTP: string;
  enterName: string;
  namePlaceholder: string;
  saveProfile: string;
  uploadPhoto: string;
  vehicleNumber: string;
  vehiclePlaceholder: string;
  selectVehicle: string;
  electricTukTuk: string;
  autoRickshaw: string;
  car: string;
  miniTruck: string;
  booking: string;
  speakDestination: string;
  listening: string;
  pickup: string;
  destination: string;
  estimatedFare: string;
  confirmBooking: string;
  findingDrivers: string;
  driverFound: string;
  rideStarted: string;
  rideCompleted: string;
  pay: string;
  callDriver: string;
  callPassenger: string;
  accept: string;
  reject: string;
  newBooking: string;
  distance: string;
  eta: string;
  fare: string;
  repeatVoice: string;
  sos: string;
  cancel: string;
  back: string;
  logout: string;
  darkMode: string;
  lightMode: string;
  profileSaved: string;
  bookingConfirmed: string;
  enterValidPhone: string;
  enterValidOTP: string;
  enterNameRequired: string;
  noDrivers: string;
  rideCancelled: string;
  emergencyCalled: string;
  tapToSpeak: string;
  processing: string;
  baseFare: string;
  distanceFare: string;
  total: string;
  perKm: string;
  nearbyDrivers: string;
  online: string;
  offline: string;
  earnings: string;
  ridesToday: string;
  rating: string;
  wallet: string;
  history: string;
  coupons: string;
  support: string;
  settings: string;
  goOnline: string;
  goOffline: string;
  youAreOffline: string;
  youAreOnline: string;
}

export const translations: Record<Language, TranslationSet> = {
  en: {
    welcome: "Welcome to Savaari", chooseRole: "Choose your role", passenger: "Passenger", driver: "Driver",
    selectLanguage: "Select Language", continue: "Continue", enterPhone: "Enter Mobile Number",
    phonePlaceholder: "10 digit number", sendOTP: "Send OTP", enterOTP: "Enter OTP", verifyOTP: "Verify OTP",
    enterName: "Enter Your Name", namePlaceholder: "Full name", saveProfile: "Save Profile",
    uploadPhoto: "Tap to upload photo", vehicleNumber: "Vehicle Number", vehiclePlaceholder: "DL01AB1234",
    selectVehicle: "Select Vehicle Type", electricTukTuk: "Electric Tuk-Tuk", autoRickshaw: "Auto Rickshaw",
    car: "Car", miniTruck: "Mini Truck", booking: "Book a Ride", speakDestination: "Tap mic and speak destination",
    listening: "Listening...", pickup: "Pickup", destination: "Destination", estimatedFare: "Estimated Fare",
    confirmBooking: "Confirm Booking", findingDrivers: "Finding drivers...", driverFound: "Driver Found!",
    rideStarted: "Ride Started", rideCompleted: "Ride Completed", pay: "Pay", callDriver: "Call Driver",
    callPassenger: "Call Passenger", accept: "Accept", reject: "Reject", newBooking: "New Booking!",
    distance: "Distance", eta: "ETA", fare: "Fare", repeatVoice: "Repeat Voice", sos: "SOS",
    cancel: "Cancel", back: "Back", logout: "Logout", darkMode: "Dark Mode", lightMode: "Light Mode",
    profileSaved: "Profile saved!", bookingConfirmed: "Driver is on the way!",
    enterValidPhone: "Enter valid 10 digit number", enterValidOTP: "Enter valid OTP",
    enterNameRequired: "Enter your name", noDrivers: "No drivers nearby", rideCancelled: "Ride cancelled",
    emergencyCalled: "Emergency called", tapToSpeak: "Tap to speak", processing: "Processing...",
    baseFare: "Base Fare", distanceFare: "Distance Fare", total: "Total", perKm: "per km",
    nearbyDrivers: "Nearby", online: "Online", offline: "Offline", earnings: "Earnings",
    ridesToday: "Rides", rating: "Rating", wallet: "Wallet", history: "History", coupons: "Coupons",
    support: "Support", settings: "Settings", goOnline: "Go Online", goOffline: "Go Offline",
    youAreOffline: "You are offline", youAreOnline: "You are online"
  },
  hi: {
    welcome: "सवारी में स्वागत", chooseRole: "भूमिका चुनें", passenger: "यात्री", driver: "ड्राइवर",
    selectLanguage: "भाषा चुनें", continue: "जारी रखें", enterPhone: "मोबाइल नंबर",
    phonePlaceholder: "10 अंकों का नंबर", sendOTP: "OTP भेजें", enterOTP: "OTP दर्ज करें", verifyOTP: "सत्यापित करें",
    enterName: "नाम दर्ज करें", namePlaceholder: "पूरा नाम", saveProfile: "सेव करें",
    uploadPhoto: "फोटो अपलोड करें", vehicleNumber: "वाहन नंबर", vehiclePlaceholder: "DL01AB1234",
    selectVehicle: "वाहन चुनें", electricTukTuk: "इलेक्ट्रिक टुक-टुक", autoRickshaw: "ऑटो रिक्शा",
    car: "कार", miniTruck: "मिनी ट्रक", booking: "सवारी बुक करें", speakDestination: "माइक दबाएं और मंजिल बताएं",
    listening: "सुन रहा हूं...", pickup: "पिकअप", destination: "मंजिल", estimatedFare: "अनुमानित किराया",
    confirmBooking: "पुष्टि करें", findingDrivers: "ड्राइवर खोज रहे हैं...", driverFound: "ड्राइवर मिल गया!",
    rideStarted: "सवारी शुरू", rideCompleted: "सवारी पूरी", pay: "भुगतान करें", callDriver: "ड्राइवर को कॉल",
    callPassenger: "यात्री को कॉल", accept: "स्वीकार", reject: "अस्वीकार", newBooking: "नई बुकिंग!",
    distance: "दूरी", eta: "पहुंचने का समय", fare: "किराया", repeatVoice: "आवाज दोहराएं", sos: "आपातकाल",
    cancel: "रद्द करें", back: "वापस", logout: "लॉगआउट", darkMode: "डार्क मोड", lightMode: "लाइट मोड",
    profileSaved: "प्रोफाइल सेव हुई!", bookingConfirmed: "ड्राइवर रास्ते में है!",
    enterValidPhone: "सही 10 अंकों का नंबर", enterValidOTP: "सही OTP दर्ज करें",
    enterNameRequired: "नाम दर्ज करें", noDrivers: "कोई ड्राइवर नहीं", rideCancelled: "सवारी रद्द",
    emergencyCalled: "आपातकालीन कॉल", tapToSpeak: "बोलने के लिए दबाएं", processing: "प्रोसेसिंग...",
    baseFare: "बेस किराया", distanceFare: "दूरी किराया", total: "कुल", perKm: "प्रति किमी",
    nearbyDrivers: "पास के", online: "ऑनलाइन", offline: "ऑफलाइन", earnings: "कमाई",
    ridesToday: "सवारियां", rating: "रेटिंग", wallet: "वॉलेट", history: "इतिहास", coupons: "कूपन",
    support: "सहायता", settings: "सेटिंग्स", goOnline: "ऑनलाइन जाएं", goOffline: "ऑफलाइन जाएं",
    youAreOffline: "आप ऑफलाइन हैं", youAreOnline: "आप ऑनलाइन हैं"
  },
  bn: {
    welcome: "সওয়ারিতে স্বাগতম", chooseRole: "ভূমিকা নির্বাচন", passenger: "যাত্রী", driver: "ড্রাইভার",
    selectLanguage: "ভাষা নির্বাচন", continue: "চালিয়ে যান", enterPhone: "মোবাইল নম্বর",
    phonePlaceholder: "10 সংখ্যার নম্বর", sendOTP: "OTP পাঠান", enterOTP: "OTP লিখুন", verifyOTP: "যাচাই করুন",
    enterName: "নাম লিখুন", namePlaceholder: "পুরো নাম", saveProfile: "সংরক্ষণ করুন",
    uploadPhoto: "ছবি আপলোড করুন", vehicleNumber: "যানবাহন নম্বর", vehiclePlaceholder: "DL01AB1234",
    selectVehicle: "যানবাহন নির্বাচন", electricTukTuk: "ইলেকট্রিক টুক-টুক", autoRickshaw: "অটো রিকশা",
    car: "গাড়ি", miniTruck: "মিনি ট্রাক", booking: "যাত্রা বুক করুন", speakDestination: "মাইকে ট্যাপ করে গন্তব্য বলুন",
    listening: "শুনছি...", pickup: "পিকআপ", destination: "গন্তব্য", estimatedFare: "আনুমানিক ভাড়া",
    confirmBooking: "নিশ্চিত করুন", findingDrivers: "ড্রাইভার খুঁজছি...", driverFound: "ড্রাইভার পাওয়া গেছে!",
    rideStarted: "যাত্রা শুরু", rideCompleted: "যাত্রা সম্পন্ন", pay: "পেমেন্ট", callDriver: "ড্রাইভারকে কল",
    callPassenger: "যাত্রীকে কল", accept: "গ্রহণ", reject: "প্রত্যাখ্যান", newBooking: "নতুন বুকিং!",
    distance: "দূরত্ব", eta: "পৌঁছানোর সময়", fare: "ভাড়া", repeatVoice: "কণ্ঠ পুনরাবৃত্তি", sos: "জরুরী",
    cancel: "বাতিল", back: "পিছনে", logout: "লগআউট", darkMode: "ডার্ক মোড", lightMode: "লাইট মোড",
    profileSaved: "প্রোফাইল সংরক্ষিত!", bookingConfirmed: "ড্রাইভার পথে আছে!",
    enterValidPhone: "সযিক 10 সংখ্যার নম্বর", enterValidOTP: "সঠিক OTP লিখুন",
    enterNameRequired: "নাম লিখুন", noDrivers: "কোনো ড্রাইভার নেই", rideCancelled: "যাত্রা বাতিল",
    emergencyCalled: "জরুরী কল", tapToSpeak: "বলতে ট্যাপ করুন", processing: "প্রসেসিং...",
    baseFare: "বেস ভাড়া", distanceFare: "দূরত্ব ভাড়া", total: "মোট", perKm: "প্রতি কিমি",
    nearbyDrivers: "কাছাকাছি", online: "অনলাইন", offline: "অফলাইন", earnings: "আয়",
    ridesToday: "যাত্রা", rating: "রেটিং", wallet: "ওয়ালেট", history: "ইতিহাস", coupons: "কুপন",
    support: "সহায়তা", settings: "সেটিংস", goOnline: "অনলাইন যান", goOffline: "অফলাইন যান",
    youAreOffline: "আপনি অফলাইন", youAreOnline: "আপনি অনলাইন"
  },
  as: {
    welcome: "চৱাৰীলৈ স্বাগতম", chooseRole: "ভূমিকা বাছনি", passenger: "যাত্ৰী", driver: "চালক",
    selectLanguage: "ভাষা বাছনি", continue: "আগবাঢ়ক", enterPhone: "মোবাইল নম্বৰ",
    phonePlaceholder: "10 অংকৰ নম্বৰ", sendOTP: "OTP পঠিয়াওক", enterOTP: "OTP সুমুৱাওক", verifyOTP: "সত্যপন কৰক",
    enterName: "নাম সুমুৱাওক", namePlaceholder: "সম্পূৰ্ণ নাম", saveProfile: "সঞ্চয় কৰক",
    uploadPhoto: "ফটো আপলোড কৰক", vehicleNumber: "যানবাহন নম্বৰ", vehiclePlaceholder: "DL01AB1234",
    selectVehicle: "যানবাহন বাছনি", electricTukTuk: "ইলেকট্ৰিক টুক-টুক", autoRickshaw: "অটো ৰিক্সা",
    car: "কাৰ", miniTruck: "মিনি ট্ৰাক", booking: "যাত্ৰা বুক কৰক", speakDestination: "মাইক টেপ কৰি গন্তব্য কওক",
    listening: "শুনিছো...", pickup: "পিকআপ", destination: "গন্তব্য", estimatedFare: "আনুমানিক ভাড়া",
    confirmBooking: "নিশ্চিত কৰক", findingDrivers: "চালক বিচাৰিছো...", driverFound: "চালক পোৱা গ'ল!",
    rideStarted: "যাত্ৰা আৰম্ভ", rideCompleted: "যাত্ৰা সম্পূৰ্ণ", pay: "পেমেণ্ট", callDriver: "চালকক কল",
    callPassenger: "যাত্ৰীক কল", accept: "গ্ৰহণ", reject: "প্ৰত্যাখ্যান", newBooking: "নতুন বুকিং!",
    distance: "দূৰত্ব", eta: "আগমনৰ সময়", fare: "ভাড়া", repeatVoice: "কণ্ঠ পুনৰাবৃত্তি", sos: "জৰুৰী",
    cancel: "বাতিল", back: "পিছলৈ", logout: "লগআউট", darkMode: "ডাৰ্ক মোড", lightMode: "লাইট মোড",
    profileSaved: "প্ৰফাইল সঞ্চিত!", bookingConfirmed: "চালক আহিছে!",
    enterValidPhone: "সঠিক 10 অংকৰ নম্বৰ", enterValidOTP: "সঠিক OTP সুমুৱাওক",
    enterNameRequired: "নাম সুমুৱাওক", noDrivers: "কোনো চালক নাই", rideCancelled: "যাত্ৰা বাতিল",
    emergencyCalled: "জৰুৰী কল", tapToSpeak: "কওঁবলৈ টেপ কৰক", processing: "প্ৰচেছিং...",
    baseFare: "বেচ ভাড়া", distanceFare: "দূৰত্ব ভাড়া", total: "মুঠ", perKm: "প্ৰতি কিমি",
    nearbyDrivers: "কাষৰীয়া", online: "অনলাইন", offline: "অফলাইন", earnings: "আয়",
    ridesToday: "যাত্ৰা", rating: "ৰেটিং", wallet: "ৱালেট", history: "ইতিহাস", coupons: "কুপন",
    support: "সহায়", settings: "ছেটিংছ", goOnline: "অনলাইন যাওক", goOffline: "অফলাইন যাওক",
    youAreOffline: "আপুনি অফলাইন", youAreOnline: "আপুনি অনলাইন"
  }
};

export interface VehicleType {
  id: string;
  name: keyof TranslationSet;
  icon: string;
  baseFare: number;
  perKm: number;
  capacity: string;
}

export const vehicleTypes: VehicleType[] = [
  { id: 'e-tuktuk', name: 'electricTukTuk', icon: '🔋', baseFare: 15, perKm: 10, capacity: '3 passengers' },
  { id: 'auto', name: 'autoRickshaw', icon: '🛺', baseFare: 20, perKm: 12, capacity: '3 passengers' },
  { id: 'car', name: 'car', icon: '🚗', baseFare: 50, perKm: 18, capacity: '4 passengers' },
  { id: 'minitruck', name: 'miniTruck', icon: '🚚', baseFare: 100, perKm: 25, capacity: '500 kg goods' }
];

export interface Profile {
  name: string;
  phone: string;
  role: 'passenger' | 'driver';
  createdAt: string;
  vehicleNumber?: string;
  vehicleType?: string;
  rating?: number;
  rides?: number;
  earnings?: number;
  isOnline?: boolean;
}

export interface DriverDemo {
  id: number;
  name: string;
  phone: string;
  photo: string;
  vehicle: string;
  vehicleNumber: string;
  rating: number;
  lat: number;
  lng: number;
}

export const demoDrivers: DriverDemo[] = [
  { id: 1, name: "Ramesh Kumar", phone: "9876543210", photo: "", vehicle: "Auto Rickshaw", vehicleNumber: "DL01AB1234", rating: 4.8, lat: 28.6139, lng: 77.2090 },
  { id: 2, name: "Suresh Singh", phone: "9876543211", photo: "", vehicle: "Electric Tuk-Tuk", vehicleNumber: "DL01CD5678", rating: 4.5, lat: 28.6200, lng: 77.2150 },
  { id: 3, name: "Amit Sharma", phone: "9876543212", photo: "", vehicle: "Car", vehicleNumber: "DL01EF9012", rating: 4.9, lat: 28.6100, lng: 77.2000 }
];

export interface Booking {
  text: string;
  dest: string;
  dist: number;
  fare: number;
  vtype: string;
}

// ==================== SPEECH UTILS ====================
export const speak = (text: string, lang: Language) => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const langMap: Record<Language, string> = { en: 'en-IN', hi: 'hi-IN', bn: 'bn-IN', as: 'as-IN' };
    utterance.lang = langMap[lang] || 'en-IN';
    utterance.rate = 0.85;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  }
};

export const startListening = (
  onResult: (text: string) => void,
  onEnd: () => void,
  lang: Language
) => {
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    const langMap: Record<Language, string> = { en: 'en-IN', hi: 'hi-IN', bn: 'bn-IN', as: 'as-IN' };
    recognition.lang = langMap[lang] || 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;
    
    recognition.onresult = (e: any) => {
      if (e.results && e.results[0] && e.results[0][0]) {
        onResult(e.results[0][0].transcript);
      }
    };
    recognition.onend = onEnd;
    recognition.onerror = () => onEnd();
    recognition.start();
    return recognition;
  }
  return null;
};
