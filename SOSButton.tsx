import React from 'react';
import { ShieldAlert } from 'lucide-react';

interface SOSButtonProps {
  onClick: () => void;
}

export const SOSButton: React.FC<SOSButtonProps> = ({ onClick }) => {
  return (
    <button
      id="sos-button"
      onClick={onClick}
      className="fixed top-24 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#FF1744] text-white shadow-lg active:scale-95 transition-all hover:bg-[#D50000] focus:outline-none ring-4 ring-[#FF1744]/20"
      title="SOS Emergency"
    >
      <ShieldAlert className="h-6 w-6 animate-pulse" />
    </button>
  );
};
