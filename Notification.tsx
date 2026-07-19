import React, { useEffect } from 'react';

interface NotificationProps {
  message: string;
  onClose: () => void;
}

export const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose, message]);

  return (
    <div
      id="app-notification"
      className="fixed top-24 left-1/2 z-50 -translate-x-1/2 rounded-2xl bg-slate-900 px-6 py-4 text-white shadow-xl dark:bg-white dark:text-slate-900 border border-slate-800 dark:border-slate-100 max-w-[90%] text-center font-bold text-base animate-bounce transition-all duration-300"
    >
      {message}
    </div>
  );
};
