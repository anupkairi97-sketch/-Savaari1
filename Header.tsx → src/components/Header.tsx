import React from 'react';
import { ArrowLeft, Volume2 } from 'lucide-react';
import { Language } from '../types';

interface HeaderProps {
  title: string;
  onBack?: () => void;
  showBack?: boolean;
  lang: Language;
  onVoice?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, onBack, showBack, onVoice }) => {
  return (
    <div id="app-header" className="sticky top-0 z-10 flex items-center justify-between bg-white px-5 py-4 shadow-sm dark:bg-[#1A1A2E] border-b border-[#E0E0E0] dark:border-[#2A2A3E] transition-colors">
      <div className="w-10">
        {showBack && onBack ? (
          <button
            id="back-btn"
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-800 active:scale-95 dark:bg-[#2A2A3E] dark:text-white transition-all"
            aria-label="Back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        ) : null}
      </div>
      <h1 id="header-title" className="text-xl font-extrabold tracking-tight text-[#1A1A2E] dark:text-white text-center flex-1">
        {title}
      </h1>
      <div className="w-10">
        {onVoice ? (
          <button
            id="voice-announcement-btn"
            onClick={onVoice}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF6B00]/10 text-[#FF6B00] active:scale-95 dark:bg-[#FF6B00]/20 transition-all"
            aria-label="Speak Page Content"
          >
            <Volume2 className="h-5 w-5" />
          </button>
        ) : null}
      </div>
    </div>
  );
};
