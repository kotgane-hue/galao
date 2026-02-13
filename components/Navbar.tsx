import React, { useState, useEffect, useRef } from 'react';
import { Mountain, Moon, Sun, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { vibrate } from '../utils/vibrate';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  
  // Optimized scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20 && !isScrolled) setIsScrolled(true);
      else if (window.scrollY <= 20 && isScrolled) setIsScrolled(false);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  // Lock body scroll to prevent jumps
  useEffect(() => {
    if (isOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const navLinks = ['home', 'tours', 'reviews', 'about'];

  const handleThemeToggle = () => {
    vibrate(10);
    toggleTheme();
  };

  const handleMenuToggle = () => {
    vibrate(15);
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[115] pt-4 md:pt-6 px-4 select-none pointer-events-none">
      <div className="max-w-7xl mx-auto flex justify-between items-center relative">
          
          {/* LOGO - Touch Target 48px */}
          <a 
            href="#" 
            onClick={() => vibrate(10)}
            className="pointer-events-auto relative z-[120] p-3 rounded-2xl bg-white/90 dark:bg-black/90 backdrop-blur-md shadow-lg min-h-[48px] min-w-[48px] flex items-center justify-center border border-white/10 group active:scale-95 transition-transform" 
            aria-label="Home"
          >
            <Mountain className="w-6 h-6 text-gray-900 dark:text-white" />
          </a>

          {/* DESKTOP NAV - Dynamic Island */}
          <div className={`hidden md:flex absolute left-1/2 -translate-x-1/2 top-0 pointer-events-auto transition-all duration-500 ease-out ${isScrolled ? 'translate-y-0 scale-100' : 'translate-y-2 scale-105'}`}>
            <nav className="glass-panel bg-black/40 backdrop-blur-xl rounded-full px-2 py-1.5 flex items-center gap-1 shadow-2xl ring-1 ring-white/10 dark:ring-white/10">
              {navLinks.map((key) => (
                <a 
                  key={key}
                  href={`#${key === 'reviews' ? 'reviews' : key}`} 
                  className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide text-white dark:text-gray-200 hover:text-gray-200 dark:hover:text-white hover:bg-white/10 dark:hover:bg-white/10 transition-all duration-300 min-h-[44px] flex items-center"
                >
                  {/* @ts-ignore */}
                  {t.nav[key]}
                </a>
              ))}
            </nav>
          </div>

          {/* DESKTOP RIGHT ACTIONS */}
          <div className="hidden md:flex items-center gap-2 pointer-events-auto">
              <div className="glass-panel bg-black/40 backdrop-blur-xl p-1.5 rounded-full flex gap-1 ring-1 ring-white/10 dark:ring-white/10">
                 <button 
                    onClick={handleThemeToggle} 
                    className="p-2.5 rounded-full hover:bg-white/10 dark:hover:bg-white/10 text-white dark:text-gray-300 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label="Toggle Theme"
                 >
                    {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                 </button>
              </div>

              <a href="#contacts" className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider hover-hover:hover:scale-105 active:scale-95 transition-all shadow-xl min-h-[44px] flex items-center">
                {t.nav.contacts}
              </a>
          </div>

          {/* MOBILE BURGER - Optimized Touch Target (48px+) */}
          <button 
            onClick={handleMenuToggle} 
            aria-label="Toggle Menu"
            aria-expanded={isOpen}
            className={`md:hidden pointer-events-auto relative z-[120] p-4 rounded-full shadow-lg border transition-all duration-300 active:scale-90 min-h-[48px] min-w-[48px] flex items-center justify-center
                ${isOpen 
                    ? 'bg-transparent border-transparent text-gray-900 dark:text-white shadow-none' 
                    : 'bg-white/90 dark:bg-black/90 backdrop-blur-md border-black/5 dark:border-white/10 text-gray-900 dark:text-white'
                }
            `}
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
                <span className={`h-0.5 w-full bg-current rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2.5' : ''}`} />
                <span className={`h-0.5 w-full bg-current rounded-full transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`h-0.5 w-full bg-current rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
      </div>

      {/* MOBILE FULL SCREEN MENU (100dvh) */}
      <div className={`fixed inset-0 z-[110] h-[100dvh] bg-white/98 dark:bg-gray-950/98 backdrop-blur-2xl transition-all duration-500 flex flex-col justify-center items-center px-8 md:hidden pointer-events-auto ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
          
          {/* Navigation Links */}
          <div className="flex flex-col gap-8 w-full max-w-sm">
              {navLinks.map((key, index) => (
                  <a 
                      key={key}
                      href={`#${key === 'reviews' ? 'reviews' : key}`}
                      onClick={() => { vibrate(10); setIsOpen(false); }}
                      className={`group flex items-center justify-between text-5xl font-black font-heading text-gray-900 dark:text-white transition-all duration-500 transform ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                  >
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 group-hover:from-electric-blue group-hover:to-purple-600 dark:group-hover:from-emerald-400 dark:group-hover:to-cyan-400 transition-all">
                          {/* @ts-ignore */}
                          {t.nav[key]}
                      </span>
                  </a>
              ))}
          </div>

          <div className={`w-full max-w-sm h-px bg-gray-200 dark:bg-gray-800 my-10 transition-all duration-700 ${isOpen ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}`}></div>

          {/* Quick Actions Dock */}
          <div className={`flex gap-4 w-full max-w-sm transition-all duration-700 delay-200 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <button 
                  onClick={handleThemeToggle} 
                  className="flex-1 h-16 rounded-2xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center gap-3 text-gray-900 dark:text-white active:scale-95 transition-transform font-bold"
              >
                  {theme === 'light' ? 'DARK' : 'LIGHT'}
              </button>
          </div>
      </div>
    </nav>
  );
};

export default Navbar;