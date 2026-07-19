import React, { useState, useEffect, useRef } from 'react';
import { Power, Check, X, Phone } from 'lucide-react';
import { Header } from '../components/Header';
import { SOSButton } from '../components/SOSButton';
import { ThemeToggle } from '../components/ThemeToggle';
import { VoiceButton } from '../components/VoiceButton';
import { Notification } from '../components/Notification';
import { Language, translations, speak, Profile } from '../types';

interface DriverDashboardScreenProps {
  profile: Profile | null;
  lang: Language;
  onLogout: () => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

interface SimulatedRide {
  pickup: string;
  destination: string;
  distance: string;
  fare: number;
  passengerName: string;
  passengerPhone: string;
}

export const DriverDashboardScreen: React.FC<DriverDashboardScreenProps> = ({
  lang,
  onLogout,
  darkMode,
  setDarkMode,
}) => {
  const t = translations[lang];
  const [isOnline, setIsOnline] = useState(false);
  const [currentRide, setCurrentRide] = useState<SimulatedRide | null>(null);
  const [rideAccepted, setRideAccepted] = useState(false);
  const [notif, setNotif] = useState('');
  const [earnings, setEarnings] = useState(0);
  const [ridesToday, setRidesToday] = useState(0);

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  // Initialize and clean up Leaflet Map
  useEffect(() => {
    const L = (window as any).L;
    if (!L) return;

    if (isOnline && mapRef.current) {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }

      try {
        const map = L.map(mapRef.current).setView([28.6139, 77.2090], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: 'Savaari'
        }).addTo(map);

        const defaultIcon = L.icon({
          iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
        });

        L.marker([28.6139, 77.2090], { icon: defaultIcon }).addTo(map).bindPopup('Your Location').openPopup();
        mapInstance.current = map;
      } catch (err) {
        console.error("Leaflet map rendering error on driver view:", err);
      }
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [isOnline]);

  // Handle simulated ride requests when online
  useEffect(() => {
    if (isOnline && !currentRide && !rideAccepted) {
      const timer = setTimeout(() => {
        const ride: SimulatedRide = {
          pickup: "Sector 12, Main Road",
          destination: "Railway Station",
          distance: "4.5 km",
          fare: 65,
          passengerName: "Anil Gupta",
          passengerPhone: "9876543299"
        };
        setCurrentRide(ride);
        setNotif(t.newBooking);
        
        let bookingSpeak = `New booking! Pickup: ${ride.pickup}. Destination: ${ride.destination}. Fare: ${ride.fare} rupees.`;
        if (lang === 'hi') bookingSpeak = `नई बुकिंग! पिकअप स्थान: ${ride.pickup}। मंजिल: ${ride.destination}। कुल किराया: ${ride.fare} रुपये।`;
        if (lang === 'bn') bookingSpeak = `নতুন বুকিং! পিকআপ: ${ride.pickup}। গন্তব্য: ${ride.destination}। ভাড়া: ${ride.fare} টাকা।`;
        if (lang === 'as') bookingSpeak = `নতুন বুকিং! পিকআপ: ${ride.pickup}। গন্তব্য: ${ride.destination}। ভাড়া: ${ride.fare} টকা।`;
        
        speak(bookingSpeak, lang);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isOnline, currentRide, rideAccepted, lang, t.newBooking]);

  const toggleOnline = () => {
    const nextState = !isOnline;
    setIsOnline(nextState);
    if (!nextState) {
      setCurrentRide(null);
      setRideAccepted(false);
    }
    speak(nextState ? t.youAreOnline : t.youAreOffline, lang);
  };

  const acceptRide = () => {
    setRideAccepted(true);
    setNotif("Ride accepted!");
    speak("Ride accepted. Head over to the pickup location.", lang);
  };

  const rejectRide = () => {
    setCurrentRide(null);
    setRideAccepted(false);
    speak("Ride rejected", lang);
  };

  const completeRide = () => {
    if (currentRide) {
      setEarnings(e => e + currentRide.fare);
      setRidesToday(r => r + 1);
    }
    setCurrentRide(null);
    setRideAccepted(false);
    setNotif("Ride completed!");
    speak("Ride completed. Earnings added to your wallet.", lang);
  };

  const handleSOS = () => {
    setNotif(t.emergencyCalled);
    speak(t.emergencyCalled, lang);
  };

  const voiceAnnouncement = () => {
    speak(isOnline ? t.youAreOnline : t.youAreOffline, lang);
  };

  return (
    <div id="driver-dashboard-screen" className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#0F0F1A] pb-10 transition-colors duration-300">
      <SOSButton onClick={handleSOS} />
      <ThemeToggle darkMode={darkMode} onToggle={() => setDarkMode(!darkMode)} />
      <VoiceButton onClick={voiceAnnouncement} />
      
      <Header
        title={t.driver}
        showBack={true}
        onBack={onLogout}
        lang={lang}
        onVoice={voiceAnnouncement}
      />

      <div className="flex-1 px-5 py-6 space-y-6">
        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-[#1A1A2E] border border-slate-100 dark:border-slate-800 text-center">
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">{t.earnings}</div>
            <div id="earnings-value" className="text-2xl font-black text-[#00C853]">₹{earnings}</div>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-[#1A1A2E] border border-slate-100 dark:border-slate-800 text-center">
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">{t.ridesToday}</div>
            <div id="rides-value" className="text-2xl font-black text-[#FF6B00]">{ridesToday}</div>
          </div>
        </div>

        {/* Go Online/Offline Power Button */}
        <button
          id="online-toggle-btn"
          className={`flex min-h-[65px] w-full items-center justify-center gap-3 rounded-2xl px-8 py-4 text-lg font-extrabold text-white shadow-lg active:scale-97 transition-all ${
            isOnline
              ? 'bg-[#FF1744] hover:bg-[#D50000]'
              : 'bg-[#00C853] hover:bg-[#00A344]'
          }`}
          onClick={toggleOnline}
        >
          <Power className="h-6 w-6" />
          {isOnline ? t.goOffline : t.goOnline}
        </button>

        {/* Live Leaflet Map */}
        {isOnline && (
          <div className="h-[250px] w-full overflow-hidden rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
            <div ref={mapRef} className="h-full w-full bg-slate-200" />
          </div>
        )}

        {/* Booking Card */}
        {currentRide && (
          <div className="rounded-3xl bg-white p-6 shadow-md dark:bg-[#1A1A2E] border-3 border-[#FF6B00] space-y-5 animate-fadeIn">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="rounded-full bg-[#FF6B00]/10 px-4 py-1.5 text-xs font-black text-[#FF6B00]">
                🔔 {t.newBooking}
              </span>
              <span className="text-2xl font-black text-[#FF6B00]">₹{currentRide.fare}</span>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold text-slate-400 mb-1">{t.pickup}</p>
                <p className="text-base font-extrabold text-slate-800 dark:text-white">📍 {currentRide.pickup}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 mb-1">{t.destination}</p>
                <p className="text-base font-extrabold text-slate-800 dark:text-white">📍 {currentRide.destination}</p>
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-400 mb-1">{t.distance}</p>
                  <p className="text-base font-extrabold text-slate-800 dark:text-white">{currentRide.distance}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 mb-1">Passenger</p>
                  <p className="text-base font-extrabold text-slate-800 dark:text-white">{currentRide.passengerName}</p>
                </div>
              </div>
            </div>

            {!rideAccepted ? (
              <div className="flex gap-4 pt-2">
                <button
                  id="accept-ride-btn"
                  onClick={acceptRide}
                  className="flex-1 flex min-h-[55px] items-center justify-center gap-1.5 rounded-xl bg-[#00C853] text-base font-extrabold text-white shadow active:scale-97 hover:bg-[#00A344] transition-all"
                >
                  <Check className="h-5 w-5" />
                  {t.accept}
                </button>
                <button
                  id="reject-ride-btn"
                  onClick={rejectRide}
                  className="flex-1 flex min-h-[55px] items-center justify-center gap-1.5 rounded-xl border-3 border-[#FF1744] bg-transparent text-base font-extrabold text-[#FF1744] shadow active:scale-97 hover:bg-[#FF1744]/5 transition-all"
                >
                  <X className="h-5 w-5" />
                  {t.reject}
                </button>
              </div>
            ) : (
              <div className="space-y-3 pt-2">
                <button
                  id="complete-ride-btn"
                  onClick={completeRide}
                  className="flex min-h-[60px] w-full items-center justify-center gap-2 rounded-xl bg-[#FF6B00] text-base font-extrabold text-white shadow active:scale-97 hover:bg-[#E55A00] transition-all"
                >
                  🏁 Complete Ride
                </button>
                <button
                  id="call-passenger-btn"
                  onClick={() => window.location.href = `tel:${currentRide.passengerPhone}`}
                  className="flex min-h-[55px] w-full items-center justify-center gap-2 rounded-xl bg-[#00C853] text-base font-extrabold text-white shadow active:scale-97 hover:bg-[#00A344] transition-all"
                >
                  📞 {t.callPassenger}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Idle States */}
        {isOnline && !currentRide && (
          <div className="rounded-3xl bg-white p-10 text-center shadow-sm dark:bg-[#1A1A2E] border border-slate-100 dark:border-slate-800 space-y-4">
            <div className="text-5xl animate-bounce">🛵</div>
            <h3 className="text-lg font-black text-slate-800 dark:text-white">{t.youAreOnline}</h3>
            <p className="text-sm font-semibold text-slate-400">Waiting for live passenger rides nearby...</p>
          </div>
        )}

        {!isOnline && (
          <div className="rounded-3xl bg-white p-10 text-center shadow-sm dark:bg-[#1A1A2E] border border-slate-100 dark:border-slate-800 space-y-4">
            <div className="text-5xl">😴</div>
            <h3 className="text-lg font-black text-slate-800 dark:text-white">{t.youAreOffline}</h3>
            <p className="text-sm font-semibold text-slate-400">Go online to begin receiving passenger booking requests</p>
          </div>
        )}
      </div>
      {notif && <Notification message={notif} onClose={() => setNotif('')} />}
    </div>
  );
};
