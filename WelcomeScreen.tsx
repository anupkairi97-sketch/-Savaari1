import React, { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { Language, translations, speak } from '../types';

interface WelcomeScreenProps {
  onSelectRole: (role: 'passenger' | 'driver') => void;
  lang: Language;
  setLang: (lang: Language) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onSelectRole, lang, setLang }) => {
  const t = translations[lang];
  const [step, setStep] = useState<'language' | 'welcome'>('language');

  useEffect(() => {
    if (step === 'welcome') {
      speak(`${t.welcome}. ${t.chooseRole}`, lang);
    }
  }, [step, lang]);

  if (step === 'language') {
    return (
      <div id="welcome-screen" className="flex min-h-screen flex-col justify-center px-6 py-12 transition-colors duration-300 dark:bg-[#0F0F1A]">
        <div className="text-center">
          <div id="app-logo" className="mb-4 text-5xl font-black tracking-tight text-[#FF6B00]">
            🛺 Savaari
          </div>
          <div className="mb-10 text-xl font-semibold text-slate-500 dark:text-slate-400">
            {t.selectLanguage}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-10">
          <button
            onClick={() => setLang('en')}
            className={`rounded-2xl border-3 px-4 py-6 text-lg font-bold transition-all duration-200 active:scale-95 ${
              lang === 'en'
                ? 'border-[#FF6B00] bg-[#FF6B00]/10 text-[#FF6B00]'
                : 'border-slate-200 bg-white text-slate-800 dark:border-slate-800 dark:bg-[#1A1A2E] dark:text-white'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLang('hi')}
            className={`rounded-2xl border-3 px-4 py-6 text-lg font-bold transition-all duration-200 active:scale-95 ${
              lang === 'hi'
                ? 'border-[#FF6B00] bg-[#FF6B00]/10 text-[#FF6B00]'
                : 'border-slate-200 bg-white text-slate-800 dark:border-slate-800 dark:bg-[#1A1A2E] dark:text-white'
            }`}
          >
            हिंदी
          </button>
          <button
            onClick={() => setLang('bn')}
            className={`rounded-2xl border-3 px-4 py-6 text-lg font-bold transition-all duration-200 active:scale-95 ${
              lang === 'bn'
                ? 'border-[#FF6B00] bg-[#FF6B00]/10 text-[#FF6B00]'
                : 'border-slate-200 bg-white text-slate-800 dark:border-slate-800 dark:bg-[#1A1A2E] dark:text-white'
            }`}
          >
            বাংলা
          </button>
          <button
            onClick={() => setLang('as')}
            className={`rounded-2xl border-3 px-4 py-6 text-lg font-bold transition-all duration-200 active:scale-95 ${
              lang === 'as'
                ? 'border-[#FF6B00] bg-[#FF6B00]/10 text-[#FF6B00]'
                : 'border-slate-200 bg-white text-slate-800 dark:border-slate-800 dark:bg-[#1A1A2E] dark:text-white'
            }`}
          >
            অসমীয়া
          </button>
        </div>

        <button
          onClick={() => setStep('welcome')}
          className="flex min-h-[70px] w-full items-center justify-center gap-2 rounded-2xl bg-[#FF6B00] px-8 py-5 text-lg font-extrabold text-white shadow-lg active:scale-97 hover:bg-[#E55A00] transition-all"
        >
          {t.continue} &rarr;
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 transition-colors duration-300 dark:bg-[#0F0F1A]">
      <div className="text-center mb-12">
        <div className="mb-2 text-5xl font-black tracking-tight text-[#FF6B00]">
          🛺 Savaari
        </div>
        <div className="text-lg font-semibold text-slate-500 dark:text-slate-400">
          {t.welcome}
        </div>
      </div>

      <div className="space-y-4">
        <button
          onClick={() => onSelectRole('passenger')}
          className="flex min-h-[90px] w-full items-center justify-center gap-3 rounded-3xl bg-[#00C853] px-8 py-6 text-xl font-extrabold text-white shadow-md active:scale-97 hover:bg-[#00A344] transition-all"
        >
          🟢 {t.passenger}
        </button>

        <button
          onClick={() => onSelectRole('driver')}
          className="flex min-h-[90px] w-full items-center justify-center gap-3 rounded-3xl bg-[#FF1744] px-8 py-6 text-xl font-extrabold text-white shadow-md active:scale-97 hover:bg-[#D50000] transition-all"
        >
          🔴 {t.driver}
        </button>
      </div>

      <button
        onClick={() => setStep('language')}
        className="mt-12 flex min-h-[55px] w-full items-center justify-center gap-2 rounded-xl border-3 border-[#FF6B00] bg-transparent px-6 py-4 text-base font-bold text-[#FF6B00] active:scale-97 hover:bg-[#FF6B00]/5 transition-all"
      >
        <Globe className="h-5 w-5" />
        {t.selectLanguage}
      </button>
    </div>
  );
};
