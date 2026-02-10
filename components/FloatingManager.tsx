import React, { useState, useEffect } from 'react';
import { Send } from 'lucide-react';

const FloatingManager: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show button only after scrolling past the first screen
    const toggleVisibility = () => {
      if (window.scrollY > 500) setIsVisible(true);
      else setIsVisible(false);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <a
      href="https://t.me/Galagon_support_bot"
      target="_blank"
      rel="noopener noreferrer"
      className="hidden md:flex fixed bottom-8 right-8 z-[90] items-center gap-3 group animate-fade-in"
    >
      {/* Tooltip (Slide out on hover) */}
      <span className="bg-white dark:bg-gray-800 px-4 py-2 rounded-xl shadow-xl text-xs font-bold text-gray-700 dark:text-gray-200 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300 border border-gray-100 dark:border-gray-700 pointer-events-none">
        Написать в поддержку
      </span>

      {/* Button */}
      <div className="w-14 h-14 bg-[#2AABEE] rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(42,171,238,0.4)] group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300 cursor-pointer border-2 border-white dark:border-gray-900">
        <Send className="w-6 h-6 text-white fill-white translate-x-[-1px] translate-y-[1px]" />
      </div>
    </a>
  );
};

export default FloatingManager;