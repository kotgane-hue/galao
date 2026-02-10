
import React, { useState, useEffect } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { vibrate } from '../utils/vibrate';

interface HeroProps {
  onOpenCalendar: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenCalendar }) => {
  const { t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const bgImages = [
    "/images/mainfoto/1.webp",
    "/images/mainfoto/2.webp",
    "/images/mainfoto/3.webp",
    "/images/mainfoto/4.webp",
    "/images/mainfoto/5.webp"
  ];

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % bgImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header id="home" className="relative h-[100dvh] w-full overflow-hidden bg-gray-900 flex flex-col justify-center items-center select-none">
      
      {/* 1. Cinematic Background Layer - LCP Optimized */}
      {bgImages.map((src, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'} ${index === 0 ? 'z-10' : 'z-0'}`}
          aria-hidden={index !== currentImageIndex}
        >
          <div className="absolute inset-0 bg-black/30 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-black/40 z-10" />
          
          <img 
            src={src} 
            alt={index === 0 ? "Galagon Mountain Peaks" : ""} // Semantic alt for LCP only
            // @ts-ignore
            fetchpriority={index === 0 ? "high" : "auto"}
            loading={index === 0 ? "eager" : "lazy"}
            decoding={index === 0 ? "sync" : "async"}
            className={`w-full h-full object-cover transition-transform duration-[10000ms] ease-out will-change-transform ${index === currentImageIndex ? 'scale-110' : 'scale-100'}`}
          />
        </div>
      ))}

      {/* 2. Main Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 flex flex-col items-center text-center mt-[-10vh] md:mt-0">
        
        {/* Season Badge */}
        <div className={`mb-6 md:mb-8 opacity-0 translate-y-4 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : ''}`}>
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
             <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white/90">{t.hero.season}</span>
           </div>
        </div>

        {/* Main Title - Increased mobile margin (mb-12) to separate from subtitle */}
        <h1 className="font-heading font-black text-white leading-[0.9] tracking-tighter mb-12 md:mb-8 mix-blend-overlay w-full min-h-[10vw] flex items-center justify-center text-balance">
           <div 
             className={`block opacity-0 translate-y-10 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : ''}`}
             style={{ fontSize: 'clamp(3.5rem, 15vw, 10rem)' }}
           >
             GALAGON
           </div>
        </h1>

        {/* Subtitle */}
        <p className={`text-base md:text-2xl text-gray-200 font-light max-w-xs md:max-w-2xl mx-auto leading-relaxed mb-10 md:mb-12 text-balance opacity-0 transition-opacity duration-1000 delay-700 ${isLoaded ? 'opacity-100' : ''}`}>
          {t.hero.subtitlePrefix} <span className="text-white font-semibold border-b border-white/30 pb-0.5">{t.hero.subtitleHighlight}</span>{t.hero.subtitleSuffix}
        </p>

        {/* Action Buttons - 44px min height for accessibility */}
        <div className={`flex flex-col w-full md:w-auto md:flex-row gap-4 opacity-0 translate-y-4 transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100 translate-y-0' : ''}`}>
           <a 
             href="#tours" 
             onClick={() => vibrate(10)}
             className="group relative px-8 h-14 bg-white text-gray-950 font-bold rounded-full transition-all hover-hover:hover:scale-105 active:scale-95 flex items-center justify-center gap-3 overflow-hidden shadow-lg shadow-white/10"
             aria-label={t.hero.choose}
           >
             <span className="relative z-10">{t.hero.choose}</span>
             <ArrowRight className="w-4 h-4 relative z-10 transition-transform hover-hover:group-hover:translate-x-1" />
           </a>
           
           <button 
             onClick={() => { vibrate(10); onOpenCalendar(); }}
             className="px-8 h-14 bg-white/5 backdrop-blur-lg border border-white/20 text-white font-bold rounded-full transition-all hover-hover:hover:bg-white/10 hover-hover:hover:border-white/40 flex items-center justify-center gap-3 active:scale-95"
             aria-label={t.hero.plan}
           >
             <Calendar className="w-4 h-4" />
             <span>{t.hero.plan}</span>
           </button>
        </div>

      </div>

      {/* 3. Bottom Info Bar */}
      <div className="absolute bottom-10 left-0 w-full z-20 hidden md:block px-6">
         <div className="max-w-7xl mx-auto flex justify-between items-end">
            <div className="flex gap-12 text-white/60 text-xs font-bold uppercase tracking-widest">
               <div className="flex flex-col gap-1">
                  <span className="text-white">Location</span>
                  <span>North Ossetia</span>
               </div>
               <div className="flex flex-col gap-1">
                  <span className="text-white">Elevation</span>
                  <span>5033m Peak</span>
               </div>
            </div>
            
            <div className="flex flex-col items-center gap-2 animate-bounce">
               <span className="text-[10px] text-white/50 uppercase tracking-widest">Scroll</span>
               <div className="w-px h-12 bg-gradient-to-b from-white to-transparent"></div>
            </div>
         </div>
      </div>

    </header>
  );
};

export default Hero;
