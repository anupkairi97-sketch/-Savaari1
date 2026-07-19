import React from 'react';
import { Volume2 } from 'lucide-react';

interface VoiceButtonProps {
  onClick: () => void;
  title?: string;
}

export const VoiceButton: React.FC<VoiceButtonProps> = ({ onClick, title = "Repeat Voice Instruction" }) => {
  return (
    <button
      id="voice-repeat-button"
      onClick={onClick}
      className="fixed bottom-24 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#FF6B00] text-white shadow-lg active:scale-95 transition-all hover:bg-[#E55A00] focus:outline-none ring-4 ring-[#FF6B00]/20"
      title={title}
    >
      <Volume2 className="h-6 w-6" />
    </button>
  );
};
