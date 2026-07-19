import React, { useState, useEffect, useRef } from 'react';
import { Header } from '../components/Header';
import { Notification } from '../components/Notification';
import { Language, translations, speak } from '../types';

interface PhoneScreenProps {
  onVerified: (phone: string) => void;
  lang: Language;
  role: 'passenger' | 'driver' | null;
  onBack: () => void;
}

export const PhoneScreen: React.FC<PhoneScreenProps> = ({ onVerified, lang, onBack }) => {
  const t = translations[lang];
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [timer, setTimer] = useState(30);
  const [notif, setNotif] = useState('');

  const otpRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    speak(t.enterPhone, lang);
  }, [lang, t.enterPhone]);

  useEffect(() => {
    if (step === 'otp' && timer > 0) {
      const interval = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(interval);
    }
  }, [timer, step]);

  const sendOTP = () => {
    if (phone.length !== 10 || !/^\d+$/.test(phone)) {
      setNotif(t.enterValidPhone);
      return;
    }
    setStep('otp');
    setTimer(30);
    speak(`${t.enterOTP}. OTP is 1 2 3 4 for demo`, lang);
    setNotif('OTP sent: 1234');
  };

  const verifyOTP = () => {
    const code = otp.join('');
    if (code === '1234') {
      onVerified(phone);
    } else {
      setNotif(t.enterValidOTP);
    }
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val[0];
    if (!/^\d*$/.test(val)) return;
    
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);
    
    if (val && index < 3) {
      otpRefs[index + 1].current?.focus();
    }
  };

  if (step === 'phone') {
    return (
      <div id="phone-screen" className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#0F0F1A] transition-colors duration-300">
        <Header 
          title={t.enterPhone} 
          showBack={true} 
          onBack={onBack} 
          lang={lang} 
          onVoice={() => speak(t.enterPhone, lang)} 
        />
        <div className="flex-1 px-6 py-10">
          <div className="mb-8 text-center">
            <p className="text-lg font-semibold text-slate-500 dark:text-slate-400">
              {t.phonePlaceholder}
            </p>
          </div>
          <div className="space-y-6">
            <input
              id="phone-input"
              className="w-full rounded-2xl border-3 border-slate-200 bg-white px-6 py-5 text-center text-2xl font-bold tracking-widest text-slate-800 outline-none focus:border-[#FF6B00] dark:border-slate-800 dark:bg-[#1A1A2E] dark:text-white transition-all"
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="0000000000"
              maxLength={10}
            />
            <button
              id="send-otp-btn"
              className="flex min-h-[70px] w-full items-center justify-center rounded-2xl bg-[#FF6B00] px-8 py-5 text-xl font-extrabold text-white shadow-lg active:scale-97 hover:bg-[#E55A00] transition-all"
              onClick={sendOTP}
            >
              {t.sendOTP}
            </button>
          </div>
        </div>
        {notif && <Notification message={notif} onClose={() => setNotif('')} />}
      </div>
    );
  }

  return (
    <div id="otp-screen" className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#0F0F1A] transition-colors duration-300">
      <Header 
        title={t.enterOTP} 
        showBack={true} 
        onBack={() => setStep('phone')} 
        lang={lang} 
        onVoice={() => speak(`${t.enterOTP}. OTP is 1 2 3 4 for demo`, lang)} 
      />
      <div className="flex-1 px-6 py-10">
        <div className="mb-8 text-center">
          <p className="text-lg font-semibold text-slate-500 dark:text-slate-400">
            +91 {phone}
          </p>
        </div>
        <div className="space-y-8">
          <div className="flex justify-center gap-3">
            {otp.map((d, i) => (
              <input
                key={i}
                ref={otpRefs[i]}
                id={`otp-input-${i}`}
                className="h-18 w-14 rounded-2xl border-3 border-slate-200 bg-white text-center text-3xl font-extrabold text-slate-800 outline-none focus:border-[#FF6B00] dark:border-slate-800 dark:bg-[#1A1A2E] dark:text-white transition-all"
                value={d}
                onChange={e => handleOtpChange(i, e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Backspace' && !d && i > 0) {
                    otpRefs[i - 1].current?.focus();
                  }
                }}
                maxLength={1}
                type="tel"
              />
            ))}
          </div>
          <button
            id="verify-otp-btn"
            className="flex min-h-[70px] w-full items-center justify-center rounded-2xl bg-[#FF6B00] px-8 py-5 text-xl font-extrabold text-white shadow-lg active:scale-97 hover:bg-[#E55A00] transition-all"
            onClick={verifyOTP}
          >
            {t.verifyOTP}
          </button>
          
          {timer > 0 ? (
            <p className="text-center text-slate-500 dark:text-slate-400 font-bold">
              Resend in {timer}s
            </p>
          ) : (
            <button
              id="resend-otp-btn"
              className="mx-auto block text-base font-extrabold text-[#FF6B00] hover:underline"
              onClick={sendOTP}
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>
      {notif && <Notification message={notif} onClose={() => setNotif('')} />}
    </div>
  );
};
