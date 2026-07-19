import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  darkMode: boolean;
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ darkMode, onToggle }) => {
  return (
    <button
      id="theme-toggle"
      onClick={onToggle}
      className="fixed top-24 left-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border-2 border-slate-200 bg-white text-slate-800 shadow-md active:scale-95 dark:border-slate-700 dark:bg-[#1A1A2E] dark:text-yellow-400 transition-all focus:outline-none"
      title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
};
