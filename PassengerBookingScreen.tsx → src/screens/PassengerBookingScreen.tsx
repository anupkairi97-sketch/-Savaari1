import React, { useState, useEffect, useRef } from 'react';
import { Mic, Phone, Check, CreditCard, ChevronLeft } from 'lucide-react';
import { Header } from '../components/Header';
import { SOSButton } from '../components/SOSButton';
import { ThemeToggle } from '../components/ThemeToggle';
import { VoiceButton } from '../components/VoiceButton';
import { Notification } from '../components/Notification';
import { Language, translations, speak, Profile, vehicleTypes, demoDrivers, DriverDemo, startListening, Booking } from '../types';

interface PassengerBookingScreenProps {
  profile: Profile | null;
  lang: Language;
  onLogout: () => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

export const PassengerBookingScreen: React.FC<PassengerBookingScreenProps> = ({
  lang,
  onLogout,
  darkMode,
  setDarkMode,
}) => {
  const t = translations[lang];
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [booking, setBooking] = useState<Booking | null>(null);
  const [finding, setFinding] = useState(false);
  const [driver, setDriver] = useState<DriverDemo | null>(null);
  const [rideStatus, setRideStatus] = useState<'idle' | 'confirmed' | 'started' | 'completed'>('idle');
  const [notif, setNotif] = useState('');

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  useEffect(() => {
    speak(t.speakDestination, lang);
  }, [lang, t.speakDestination]);

  // Leaflet Map handling
  useEffect(() => {
    const L = (window as any).L;
    if (!L) return;

    if ((rideStatus === 'confirmed' || rideStatus === 'started') && mapRef.current) {
      // Destroy existing map if any
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }

      try {
        const map = L.map(mapRef.current).setView([28.6139, 77.2090], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: 'Savaari'
        }).addTo(map);

        // Customize marker icons to avoid Vite bundle loading failures
        const defaultIcon = L.icon({
          iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
        });

        L.marker([28.6139, 77.2090], { icon: defaultIcon }).addTo(map).bindPopup('Pickup').openPopup();
        L.marker([28.6250, 77.2200], { icon: defaultIcon }).addTo(map).bindPopup('Destination');
        
        mapInstance.current = map;
      } catch (err) {
        console.error("Leaflet rendering error:", err);
      }
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [rideStatus, booking]);

  const handleMic = () => {
    if (isListening) return;
    setIsListening(true);
    speak(t.listening, lang);

    const recognition = startListening(
      (text) => {
        setTranscript(text);
        processBooking(text);
      },
      () => {
        setIsListening(false);
      },
      lang
    );

    // Fallback simulation if Speech API is not granted or supported in iframe
    if (!recognition) {
      setTimeout(() => {
        let simulatedText = "Mujhe Railway Station jana hai";
        if (lang === 'bn') simulatedText = "আমি রেলওয়ে স্টেশনে যাবো";
        if (lang === 'as') simulatedText = "মই ৰে'লৱে ষ্টেচনলৈ যাম";
        if (lang === 'hi') simulatedText = "मुझे रेलवे स्टेशन जाना है";
        
        setTranscript(simulatedText);
        processBooking(simulatedText);
        setIsListening(false);
      }, 2500);
    }
  };

  const processBooking = (text: string) => {
    const lower = text.toLowerCase();
    let vtype = 'auto';
    if (lower.includes('truck') || lower.includes('saman') || lower.includes('load') || lower.includes('মাল') || lower.includes('ট্ৰাক')) {
      vtype = 'minitruck';
    } else if (lower.includes('car') || lower.includes('গাড়ি') || lower.includes('গাড়ী') || lower.includes('কাৰ')) {
      vtype = 'car';
    } else if (lower.includes('electric') || lower.includes('e-') || lower.includes('টুক') || lower.includes('ইলেকট্ৰিক')) {
      vtype = 'e-tuktuk';
    }

    let dest = 'Railway Station';
    if (lang === 'hi') dest = 'रेलवे स्टेशन';
    if (lang === 'bn') dest = 'রেলওয়ে স্টেশন';
    if (lang === 'as') dest = "ৰে'লৱে ষ্টেচন";

    if (lower.includes('hospital') || lower.includes('হাসপাতাল') || lower.includes('চিকিৎসালয়')) {
      dest = lang === 'hi' ? 'सिटी अस्पताल' : lang === 'bn' ? 'সিটি হাসপাতাল' : lang === 'as' ? 'সিটি চিকিৎসালয়' : 'City Hospital';
    } else if (lower.includes('market') || lower.includes('বাজার') || lower.includes('বজাৰ')) {
      dest = lang === 'hi' ? 'केंद्रीय बाजार' : lang === 'bn' ? 'সেন্ট্রাল মার্কেট' : lang === 'as' ? 'কেন্দ্ৰীয় বজাৰ' : 'Central Market';
    }

    const dist = Math.round((3 + Math.random() * 8) * 10) / 10;
    const v = vehicleTypes.find(x => x.id === vtype) || vehicleTypes[1];
    const fare = Math.round(v.baseFare + dist * v.perKm);

    setBooking({ text, dest, dist, fare, vtype });
    
    let speechOutput = `Destination matched: ${dest}. Distance is ${dist} kilometers. Expected fare is ${fare} rupees.`;
    if (lang === 'hi') speechOutput = `मंजिल: ${dest}. दूरी: ${dist} किलोमीटर. अनुमानित किराया: ${fare} रुपये.`;
    if (lang === 'bn') speechOutput = `গন্তব্য: ${dest}. দূরত্ব: ${dist} কিলোমিটার. আনুমানিক ভাড়া: ${fare} টাকা.`;
    if (lang === 'as') speechOutput = `গন্তব্য: ${dest}. দূৰত্ব: ${dist} কিলোমিটাৰ. আনুমানিক ভাড়া: ${fare} টকা.`;
    
    speak(speechOutput, lang);
  };

  const confirmBooking = () => {
    if (!booking) return;
    setFinding(true);
    speak(t.findingDrivers, lang);

    setTimeout(() => {
      // Find suitable matching driver
      const v = vehicleTypes.find(x => x.id === booking.vtype);
      const matchedName = v ? t[v.name] : "Auto Rickshaw";
      const availableDrivers = demoDrivers.filter(d => d.vehicle.toLowerCase().includes(matchedName.toString().toLowerCase()) || d.vehicle === 'Auto Rickshaw');
      const d = availableDrivers.length > 0 ? availableDrivers[0] : demoDrivers[0];

      setDriver(d);
      setFinding(false);
      setRideStatus('confirmed');
      setNotif(t.bookingConfirmed);
      
      let driverSpeak = `Driver ${d.name} matched. Vehicle number is ${d.vehicleNumber}. Arriving in 5 minutes.`;
      if (lang === 'hi') driverSpeak = `ड्राइवर ${d.name} मिल गया है। गाड़ी नंबर ${d.vehicleNumber} है। 5 मिनट में पहुंच रहा है।`;
      if (lang === 'bn') driverSpeak = `ড্রাইভার ${d.name} পাওয়া গেছে। গাড়ির নম্বর ${d.vehicleNumber}। ৫ মিনিটের মধ্যে পৌঁছাচ্ছেন।`;
      if (lang === 'as') driverSpeak = `চালক ${d.name} পোৱা গৈছে। গাড়ীৰ নম্বৰ ${d.vehicleNumber}। ৫ মিনিটৰ ভিতৰত উপস্থিত হ'ব।`;
      
      speak(driverSpeak, lang);

      // Simulation: Start ride after 8s
      const startTimer = setTimeout(() => {
        setRideStatus('started');
        let startSpeak = "Your ride has started. Have a safe journey.";
        if (lang === 'hi') startSpeak = "आपकी सवारी शुरू हो गई है। यात्रा मंगलमय हो।";
        if (lang === 'bn') startSpeak = "আপনার যাত্রা শুরু হয়েছে। শুভ যাত্রা।";
        if (lang === 'as') startSpeak = "আপোনাৰ যাত্ৰা আৰম্ভ হৈছে। যাত্ৰা শুভ হওক।";
        speak(startSpeak, lang);
      }, 8000);

      // Simulation: Complete ride after 16s
      const completeTimer = setTimeout(() => {
        setRideStatus('completed');
        let compSpeak = `Ride completed. Total fare is ${booking.fare} rupees. Please complete payment.`;
        if (lang === 'hi') compSpeak = `सवारी पूरी हुई। कुल किराया ${booking.fare} रुपये है। कृपया भुगतान करें।`;
        if (lang === 'bn') compSpeak = `যাত্রা সম্পন্ন হয়েছে। মোট ভাড়া ${booking.fare} টাকা। অনুগ্রহ করে পেমেন্ট করুন।`;
        if (lang === 'as') compSpeak = `যাত্ৰা সম্পূৰ্ণ হৈছে। মুঠ ভাড়া ${booking.fare} টকা। অনুগ্ৰহ কৰি পেমেণ্ট কৰক।`;
        speak(compSpeak, lang);
      }, 16000);

      return () => {
        clearTimeout(startTimer);
        clearTimeout(completeTimer);
      };
    }, 4000);
  };

  const handleSOS = () => {
    setNotif(t.emergencyCalled);
    speak(t.emergencyCalled, lang);
  };

  const voiceFeedback = () => {
    if (rideStatus === 'idle') {
      if (booking) {
        speak(`${t.destination}: ${booking.dest}. ${t.fare}: ${booking.fare} rupees.`, lang);
      } else {
        speak(t.speakDestination, lang);
      }
    } else if (rideStatus === 'confirmed' && driver) {
      speak(`${t.driverFound}. ${driver.name} is on the way.`, lang);
    } else if (rideStatus === 'started') {
      speak(t.rideStarted, lang);
    } else if (rideStatus === 'completed' && booking) {
      speak(`${t.rideCompleted}. ${t.fare}: ${booking.fare} rupees.`, lang);
    }
  };

  if (finding) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 dark:bg-[#0F0F1A] p-6 transition-colors duration-300">
        <div className="flex flex-col items-center justify-center bg-white dark:bg-[#1A1A2E] rounded-3xl p-10 shadow-lg text-center border border-slate-100 dark:border-slate-800 w-full max-w-sm">
          <div className="mb-6 h-16 w-16 animate-spin rounded-full border-5 border-slate-200 border-t-[#FF6B00]"></div>
          <p className="text-xl font-black text-slate-800 dark:text-white mb-2">{t.findingDrivers}</p>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{t.processing}</p>
        </div>
      </div>
    );
  }

  if (rideStatus === 'confirmed' && driver) {
    return (
      <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#0F0F1A] transition-colors duration-300">
        <SOSButton onClick={handleSOS} />
        <ThemeToggle darkMode={darkMode} onToggle={() => setDarkMode(!darkMode)} />
        <VoiceButton onClick={voiceFeedback} />
        <Header
          title={t.driverFound}
          showBack={true}
          onBack={() => {
            setRideStatus('idle');
            setBooking(null);
            setDriver(null);
          }}
          lang={lang}
          onVoice={voiceFeedback}
        />

        <div className="flex-1 px-5 py-6 space-y-6">
          <div className="flex items-center rounded-3xl bg-white p-5 shadow-sm dark:bg-[#1A1A2E] border border-slate-100 dark:border-slate-800">
            <div className="mr-5 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-[#2A2A3E] text-slate-800 dark:text-white text-3xl">
              👤
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-black text-slate-800 dark:text-white">{driver.name}</h3>
              <p className="text-sm font-bold text-[#FF6B00]">⭐ {driver.rating} | {driver.vehicleNumber}</p>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">{driver.vehicle}</p>
            </div>
          </div>

          <div className="h-[300px] w-full overflow-hidden rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
            <div ref={mapRef} className="h-full w-full bg-slate-200" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white p-4 text-center shadow-sm dark:bg-[#1A1A2E] border border-slate-100 dark:border-slate-800">
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">{t.distance}</div>
              <div className="text-lg font-black text-[#FF6B00]">{booking?.dist} km</div>
            </div>
            <div className="rounded-2xl bg-white p-4 text-center shadow-sm dark:bg-[#1A1A2E] border border-slate-100 dark:border-slate-800">
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">{t.eta}</div>
              <div className="text-lg font-black text-[#FF6B00]">5 min</div>
            </div>
          </div>

          <button
            onClick={() => window.location.href = `tel:${driver.phone}`}
            className="flex min-h-[70px] w-full items-center justify-center gap-2 rounded-2xl bg-[#00C853] px-8 py-5 text-xl font-extrabold text-white shadow-lg active:scale-97 hover:bg-[#00A344] transition-all"
          >
            📞 {t.callDriver}
          </button>
        </div>
        {notif && <Notification message={notif} onClose={() => setNotif('')} />}
      </div>
    );
  }

  if (rideStatus === 'started') {
    return (
      <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#0F0F1A] transition-colors duration-300">
        <SOSButton onClick={handleSOS} />
        <ThemeToggle darkMode={darkMode} onToggle={() => setDarkMode(!darkMode)} />
        <VoiceButton onClick={voiceFeedback} />
        <Header
          title={t.rideStarted}
          showBack={false}
          lang={lang}
          onVoice={voiceFeedback}
        />

        <div className="flex-1 px-5 py-6 flex flex-col space-y-6">
          <div className="flex-1 min-h-[350px] w-full overflow-hidden rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
            <div ref={mapRef} className="h-full w-full bg-slate-200" />
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm dark:bg-[#1A1A2E] border border-slate-100 dark:border-slate-800">
            <div className="flex items-center mb-4">
              <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-[#2A2A3E] text-2xl">
                🛺
              </div>
              <div className="flex-1">
                <h3 className="text-base font-black text-slate-800 dark:text-white">{driver?.name}</h3>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400">{driver?.vehicleNumber}</p>
              </div>
            </div>
            <button
              onClick={() => window.location.href = `tel:${driver?.phone}`}
              className="flex min-h-[60px] w-full items-center justify-center gap-2 rounded-2xl bg-[#00C853] px-6 py-4 text-lg font-bold text-white shadow-md active:scale-97 hover:bg-[#00A344] transition-all"
            >
              📞 {t.callDriver}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (rideStatus === 'completed' && booking) {
    const v = vehicleTypes.find(x => x.id === booking.vtype) || vehicleTypes[1];
    const baseVal = v.baseFare;
    const distanceVal = booking.fare - baseVal;

    return (
      <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#0F0F1A] justify-center px-6 py-12 transition-colors duration-300">
        <div className="mx-auto text-center mb-8">
          <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-[#00C853]/10 text-[#00C853]">
            <Check className="h-12 w-12 stroke-[3]" />
          </div>
          <h1 className="text-3xl font-black text-slate-800 dark:text-white">{t.rideCompleted}</h1>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-lg dark:bg-[#1A1A2E] border border-slate-100 dark:border-slate-800 space-y-4 mb-8">
          <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-3 text-base font-semibold text-slate-600 dark:text-slate-400">
            <span>{t.baseFare}</span>
            <span>₹{baseVal}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-3 text-base font-semibold text-slate-600 dark:text-slate-400">
            <span>{t.distanceFare} ({booking.dist} km)</span>
            <span>₹{distanceVal}</span>
          </div>
          <div className="flex justify-between pt-2 text-2xl font-black text-[#FF6B00]">
            <span>{t.total}</span>
            <span>₹{booking.fare}</span>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => {
              setRideStatus('idle');
              setBooking(null);
              setDriver(null);
              setTranscript('');
            }}
            className="flex min-h-[70px] w-full items-center justify-center gap-3 rounded-2xl bg-[#FF6B00] px-8 py-5 text-xl font-extrabold text-white shadow-lg active:scale-97 hover:bg-[#E55A00] transition-all"
          >
            <CreditCard className="h-6 w-6" />
            {t.pay} ₹{booking.fare}
          </button>

          <button
            onClick={() => {
              setRideStatus('idle');
              setBooking(null);
              setDriver(null);
              setTranscript('');
            }}
            className="flex min-h-[55px] w-full items-center justify-center rounded-xl border-3 border-slate-200 bg-white text-slate-800 font-bold active:scale-97 dark:border-slate-800 dark:bg-[#1A1A2E] dark:text-white transition-all"
          >
            {t.back}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#0F0F1A] transition-colors duration-300 pb-10">
      <SOSButton onClick={handleSOS} />
      <ThemeToggle darkMode={darkMode} onToggle={() => setDarkMode(!darkMode)} />
      <VoiceButton onClick={voiceFeedback} />
      
      <Header
        title={t.booking}
        showBack={true}
        onBack={onLogout}
        lang={lang}
        onVoice={voiceFeedback}
      />

      <div className="flex-1 px-6 py-8 flex flex-col justify-center text-center">
        <p className="text-xl font-bold text-slate-500 dark:text-slate-400 mb-10">
          {t.speakDestination}
        </p>

        <div className="mb-10">
          <button
            id="mic-recording-button"
            className={`mx-auto flex h-40 w-40 items-center justify-center rounded-full transition-all duration-300 shadow-xl border-4 ${
              isListening
                ? 'bg-[#FF1744] text-white border-white animate-pulse shadow-[#FF1744]/40 scale-105'
                : 'bg-[#FF6B00] text-white border-white hover:bg-[#E55A00] shadow-[#FF6B00]/40'
            }`}
            onClick={handleMic}
          >
            <Mic className="h-16 w-16" />
          </button>
          {isListening && (
            <p className="mt-4 text-base font-extrabold text-[#FF1744] animate-bounce">
              {t.listening}
            </p>
          )}
        </div>

        {transcript && (
          <div className="rounded-2xl bg-white p-5 text-left shadow-sm dark:bg-[#1A1A2E] border border-slate-100 dark:border-slate-800 mb-6">
            <p className="text-xs font-bold text-slate-400 mb-1">{t.tapToSpeak}</p>
            <p className="text-base font-extrabold text-slate-800 dark:text-white">&ldquo;{transcript}&rdquo;</p>
          </div>
        )}

        {booking && (
          <div className="rounded-3xl bg-white p-6 text-left shadow-md dark:bg-[#1A1A2E] border-2 border-[#FF6B00] animate-fadeIn">
            <div className="flex items-center mb-5">
              <span className="text-4xl mr-4">
                {vehicleTypes.find(v => v.id === booking.vtype)?.icon || '🛺'}
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-800 dark:text-white">{booking.dest}</h3>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400">{booking.dist} km</p>
              </div>
            </div>

            <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mb-5 flex justify-between items-center">
              <span className="text-sm font-bold text-slate-500 dark:text-slate-400">{t.estimatedFare}</span>
              <span className="text-3xl font-black text-[#FF6B00]">₹{booking.fare}</span>
            </div>

            <button
              id="confirm-booking-btn"
              onClick={confirmBooking}
              className="flex min-h-[65px] w-full items-center justify-center rounded-2xl bg-[#FF6B00] px-6 py-4 text-lg font-extrabold text-white shadow-lg active:scale-97 hover:bg-[#E55A00] transition-all"
            >
              {t.confirmBooking}
            </button>
          </div>
        )}
      </div>
      {notif && <Notification message={notif} onClose={() => setNotif('')} />}
    </div>
  );
};
