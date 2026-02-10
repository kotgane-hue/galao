
import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Only show on large screens and when scrolled
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`hidden xl:block fixed bottom-24 right-6 z-[90] p-3 rounded-full bg-white dark:bg-gray-800 text-electric-blue dark:text-emerald-500 shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 transform hover:scale-110 active:scale-90 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      aria-label="Наверх"
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  );
};

export default BackToTop;
