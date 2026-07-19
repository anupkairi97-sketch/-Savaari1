import React, { useState, useEffect } from 'react';
import { Camera, User } from 'lucide-react';
import { Header } from '../components/Header';
import { Notification } from '../components/Notification';
import { Language, translations, speak, Profile } from '../types';

interface PassengerProfileScreenProps {
  onSave: (profile: Profile) => void;
  lang: Language;
  phone: string;
}

export const PassengerProfileScreen: React.FC<PassengerProfileScreenProps> = ({ onSave, lang, phone }) => {
  const t = translations[lang];
  const [name, setName] = useState('');
  const [notif, setNotif] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);

  useEffect(() => {
    speak(t.enterName, lang);
  }, [lang, t.enterName]);

  const handleSave = () => {
    if (!name.trim()) {
      setNotif(t.enterNameRequired);
      return;
    }
    const profile: Profile = {
      name: name.trim(),
      phone,
      role: 'passenger',
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('savaari_profile', JSON.stringify(profile));
    setNotif(t.profileSaved);
    setTimeout(() => onSave(profile), 1000);
  };

  const handlePhotoClick = () => {
    // Simulated upload
    setPhoto("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200");
    setNotif("Photo uploaded successfully!");
  };

  return (
    <div id="passenger-profile-screen" className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#0F0F1A] transition-colors duration-300">
      <Header
        title={t.enterName}
        showBack={false}
        lang={lang}
        onVoice={() => speak(t.enterName, lang)}
      />
      <div className="flex-1 px-6 py-10">
        <div className="mx-auto mb-10 text-center">
          <div
            id="passenger-photo-upload"
            onClick={handlePhotoClick}
            className="group relative mx-auto flex h-36 w-36 cursor-pointer items-center justify-center overflow-hidden rounded-full border-4 border-dashed border-slate-300 bg-white shadow-inner dark:border-slate-700 dark:bg-[#1A1A2E] hover:border-[#FF6B00] dark:hover:border-[#FF6B00] transition-all"
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
                <Camera className="mb-2 h-10 w-10" />
                <span className="text-xs font-bold px-2 text-center">{t.uploadPhoto}</span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <User className="absolute top-5 left-5 h-6 w-6 text-slate-400" />
            <input
              id="passenger-name-input"
              className="w-full rounded-2xl border-3 border-slate-200 bg-white pl-14 pr-6 py-5 text-lg font-bold text-slate-800 outline-none focus:border-[#FF6B00] dark:border-slate-800 dark:bg-[#1A1A2E] dark:text-white transition-all"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder={t.namePlaceholder}
            />
          </div>

          <button
            id="save-passenger-profile-btn"
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
