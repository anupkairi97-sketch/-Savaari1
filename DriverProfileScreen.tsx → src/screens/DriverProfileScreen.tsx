import React, { useState, useEffect } from 'react';
import { Camera, User, ClipboardList } from 'lucide-react';
import { Header } from '../components/Header';
import { Notification } from '../components/Notification';
import { Language, translations, speak, Profile, vehicleTypes } from '../types';

interface DriverProfileScreenProps {
  onSave: (profile: Profile) => void;
  lang: Language;
  phone: string;
}

export const DriverProfileScreen: React.FC<DriverProfileScreenProps> = ({ onSave, lang, phone }) => {
  const t = translations[lang];
  const [name, setName] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [notif, setNotif] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);

  useEffect(() => {
    speak(`${t.enterName}. ${t.selectVehicle}`, lang);
  }, [lang, t.enterName, t.selectVehicle]);

  const handleSave = () => {
    if (!name.trim()) {
      setNotif(t.enterNameRequired);
      return;
    }
    if (!vehicleNumber.trim()) {
      setNotif(t.vehicleNumber);
      return;
    }
    if (!selectedVehicle) {
      setNotif(t.selectVehicle);
      return;
    }

    const profile: Profile = {
      name: name.trim(),
      phone,
      vehicleNumber: vehicleNumber.trim().toUpperCase(),
      vehicleType: selectedVehicle,
      role: 'driver',
      createdAt: new Date().toISOString(),
      rating: 5.0,
      rides: 0,
      earnings: 0,
      isOnline: false
    };

    localStorage.setItem('savaari_profile', JSON.stringify(profile));
    setNotif(t.profileSaved);
    setTimeout(() => onSave(profile), 1000);
  };

  const handlePhotoClick = () => {
    setPhoto("https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200");
    setNotif("Driver photo uploaded!");
  };

  return (
    <div id="driver-profile-screen" className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#0F0F1A] pb-10 transition-colors duration-300">
      <Header
        title={t.enterName}
        showBack={false}
        lang={lang}
        onVoice={() => speak(`${t.enterName}. ${t.selectVehicle}`, lang)}
      />
      <div className="flex-1 px-6 py-8">
        <div className="mx-auto mb-8 text-center">
          <div
            id="driver-photo-upload"
            onClick={handlePhotoClick}
            className="group relative mx-auto flex h-32 w-32 cursor-pointer items-center justify-center overflow-hidden rounded-full border-4 border-dashed border-slate-300 bg-white shadow-inner dark:border-slate-700 dark:bg-[#1A1A2E] hover:border-[#FF6B00] dark:hover:border-[#FF6B00] transition-all"
          >
            {photo ? (
              <img
                src={photo}
                alt="Profile"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-slate-400 group-hover:text-[#FF6B00] transition-colors">
                <Camera className="mb-2 h-8 w-8" />
                <span className="text-[11px] font-bold px-2 text-center">{t.uploadPhoto}</span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <User className="absolute top-5 left-5 h-6 w-6 text-slate-400" />
            <input
              id="driver-name-input"
              className="w-full rounded-2xl border-3 border-slate-200 bg-white pl-14 pr-6 py-5 text-lg font-bold text-slate-800 outline-none focus:border-[#FF6B00] dark:border-slate-800 dark:bg-[#1A1A2E] dark:text-white transition-all"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder={t.namePlaceholder}
            />
          </div>

          <div className="relative">
            <ClipboardList className="absolute top-5 left-5 h-6 w-6 text-slate-400" />
            <input
              id="vehicle-number-input"
              className="w-full rounded-2xl border-3 border-slate-200 bg-white pl-14 pr-6 py-5 text-lg font-bold text-slate-800 outline-none focus:border-[#FF6B00] dark:border-slate-800 dark:bg-[#1A1A2E] dark:text-white transition-all"
              value={vehicleNumber}
              onChange={e => setVehicleNumber(e.target.value)}
              placeholder={t.vehiclePlaceholder}
            />
          </div>

          <div>
            <div className="mb-4 text-lg font-extrabold text-slate-700 dark:text-slate-300">
              {t.selectVehicle}
            </div>
            <div className="space-y-3">
              {vehicleTypes.map(v => (
                <div
                  key={v.id}
                  id={`vehicle-option-${v.id}`}
                  className={`flex cursor-pointer items-center rounded-2xl border-3 p-4 bg-white dark:bg-[#1A1A2E] transition-all duration-200 active:scale-98 ${
                    selectedVehicle === v.id
                      ? 'border-[#FF6B00] bg-[#FF6B00]/5'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                  onClick={() => setSelectedVehicle(v.id)}
                >
                  <div className="mr-5 text-4xl">{v.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-base font-extrabold text-slate-800 dark:text-white">
                      {t[v.name]}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      Base: ₹{v.baseFare} | ₹{v.perKm}/{t.perKm} ({v.capacity})
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            id="save-driver-profile-btn"
            className="flex min-h-[70px] w-full items-center justify-center rounded-2xl bg-[#FF6B00] px-8 py-5 text-xl font-extrabold text-white shadow-lg active:scale-97 hover:bg-[#E55A00] transition-all"
            onClick={handleSave}
          >
            {t.saveProfile}
          </button>
        </div>
      </div>
      {notif && <Notification message={notif} onClose={() => setNotif('')} />}
    </div>
  );
};
