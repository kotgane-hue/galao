
import React, { useRef, useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ChevronLeft, ChevronRight, Camera, Mountain, Map, Users } from 'lucide-react';
import { vibrate } from '../utils/vibrate';

// Helper Hook for Counter Animation
const useCounter = (end: number, duration: number = 2000, start: boolean = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number | null = null;
    let frameId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing: EaseOutExpo for smooth finish
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(easeProgress * end));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [end, duration, start]);

  return count;
};

const StatCounter: React.FC<{ value: number; label: string; suffix: string }> = ({ value, label, suffix }) => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const count = useCounter(value, 2000, isVisible);

  useEffect(() => {
    if (!ref) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    });
    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref]);

  return (
    <div ref={setRef} className="text-center group bg-white/50 dark:bg-gray-800/50 md:bg-transparent md:dark:bg-transparent backdrop-blur-sm md:backdrop-blur-none rounded-2xl p-4 md:p-0 border border-white/20 md:border-none shadow-sm md:shadow-none w-full md:w-auto">
      <div className="text-4xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-deep-slate to-gray-400 dark:from-white dark:to-gray-600 transition-transform md:hover-hover:group-hover:scale-110 duration-500 tabular-nums">
        {count}{suffix}
      </div>
      <div className="text-electric-blue dark:text-emerald-400 text-xs md:text-sm font-bold uppercase tracking-widest mt-2 bg-electric-blue/10 dark:bg-emerald-500/10 px-4 py-1 rounded-full inline-block">
        {label}
      </div>
    </div>
  );
};

const GallerySection: React.FC = () => {
  const { gallery, t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  // Highly Optimized Scroll Listener (Throttled via requestAnimationFrame pattern)
  useEffect(() => {
    const isDesktop = window.matchMedia("(hover: hover)").matches;
    if (!isDesktop) return;

    let requestRunning: number | null = null;
    
    const handleScroll = () => {
      if (requestRunning === null) {
        requestRunning = window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          requestRunning = null;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (requestRunning !== null) window.cancelAnimationFrame(requestRunning);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    vibrate(10);
    if (scrollRef.current) {
      const scrollAmount = 350; 
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="about" className="py-16 md:py-24 bg-light-block dark:bg-gray-950 relative overflow-hidden transition-colors duration-500 min-h-[90vh] flex flex-col justify-center">
       
       {/* MASSIVE BACKGROUND TEXT */}
       <div 
         className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 w-full overflow-hidden select-none justify-center will-change-transform"
         style={{ transform: `translate(-50%, calc(-50% + ${scrollY * 0.1}px))` }} 
         aria-hidden="true"
       >
          <h1 className="text-[20rem] font-black text-gray-200/40 dark:text-gray-800/20 text-center tracking-tighter leading-none whitespace-nowrap">
             GALAGON
          </h1>
       </div>

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
         
         <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 animate-fade-in-up gap-8 md:gap-4">
            <div className="relative text-center md:text-left">
                <span className="text-electric-blue dark:text-emerald-400 font-bold tracking-widest uppercase text-xs border border-electric-blue/30 dark:border-emerald-500/30 bg-electric-blue/10 dark:bg-emerald-500/10 px-4 py-1.5 rounded-full inline-block mb-4 shadow-lg backdrop-blur-sm select-none">
                  {t.nav.about}
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-black leading-[1.1] md:leading-tight text-deep-slate dark:text-white drop-shadow-2xl text-balance select-none">
                  {t.gallery.title} <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-purple-600 dark:from-emerald-400 dark:to-cyan-400">{t.gallery.highlight}</span>
                </h2>
                <p className="mt-6 text-gray-600 dark:text-gray-300 md:max-w-xl text-base md:text-lg font-medium leading-relaxed bg-white/50 dark:bg-black/20 p-4 rounded-2xl backdrop-blur-md border border-white/20 dark:border-white/5 mx-auto md:mx-0 text-balance text-left md:text-left">
                   {t.gallery.desc}
                </p>
            </div>

            <div className="hidden md:flex gap-4 justify-end mt-4 md:mt-0 select-none">
                <button 
                  onClick={() => scroll('left')}
                  className="w-14 h-14 rounded-full bg-white dark:bg-gray-800 shadow-xl hover-hover:hover:shadow-2xl text-deep-slate dark:text-white border border-gray-200 dark:border-gray-700 hover-hover:hover:scale-110 active:scale-95 transition-all flex items-center justify-center"
                  aria-label="Scroll gallery left"
                >
                   <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => scroll('right')}
                  className="w-14 h-14 rounded-full bg-deep-slate dark:bg-white shadow-xl hover-hover:hover:shadow-2xl text-white dark:text-deep-slate border border-transparent hover-hover:hover:scale-110 active:scale-95 transition-all flex items-center justify-center"
                  aria-label="Scroll gallery right"
                >
                   <ChevronRight className="w-6 h-6" />
                </button>
            </div>
         </header>

         {/* Carousel Container */}
         {/* Removed touch-pan-y to enable native horizontal scrolling */}
         <div 
           ref={scrollRef}
           className="flex gap-4 md:gap-8 overflow-x-auto pb-12 snap-x snap-mandatory hide-scrollbar pl-4 md:pl-4"
           style={{ scrollPaddingLeft: '1rem', scrollPaddingRight: '1rem' }}
         >
            {gallery.map((item, index) => (
               <article 
                 key={item.id}
                 className="flex-shrink-0 w-[260px] md:w-[350px] h-[400px] md:h-[550px] relative rounded-[2.5rem] overflow-hidden group snap-center border-[3px] border-white dark:border-gray-800 shadow-2xl hover-hover:hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all duration-500 transform hover-hover:hover:-translate-y-4 hover-hover:hover:rotate-1 select-none"
               >
                  <img 
                    src={item.src} 
                    alt={item.alt} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] hover-hover:group-hover:scale-110"
                    loading={index < 2 ? "eager" : "lazy"}
                    decoding="async"
                    onError={(e) => { e.currentTarget.parentElement!.style.display = 'none'; }}
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60 hover-hover:group-hover:opacity-80 transition-opacity"></div>
                  
                  <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                     <Mountain className="w-4 h-4 text-white" />
                  </div>

                  <div className="absolute bottom-8 left-8 right-8 transform translate-y-4 hover-hover:group-hover:translate-y-0 transition-transform duration-500">
                     <div className="inline-flex items-center gap-2 text-electric-blue dark:text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-2 bg-black/50 px-2 py-1 rounded-md backdrop-blur-md">
                        <Camera className="w-3 h-3" />
                        <span>Moments</span>
                     </div>
                     <p className="text-white text-xl md:text-2xl font-heading font-bold leading-tight drop-shadow-lg text-balance">
                        {item.alt || t.hero.slogans[index % t.hero.slogans.length]?.title || "Mountain Vibe"}
                     </p>
                  </div>
               </article>
            ))}
         </div>

         {/* Animated Stats with Mobile Optimization */}
         <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-24 mt-4 md:mt-8 animate-fade-in-up select-none w-full" style={{ animationDelay: '0.2s' }}>
             
             {/* Stat 1 */}
             <StatCounter 
                value={2000} 
                suffix="+" 
                label={t.gallery.stats.tourists} 
             />

             {/* Separator - Hidden on mobile, visible on desktop */}
             <div className="hidden md:block w-px bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-700 to-transparent h-24"></div>

             {/* Stat 2 */}
             <StatCounter 
                value={50} 
                suffix="+" 
                label={t.gallery.stats.routes} 
             />
         </div>

       </div>
    </section>
  );
};

export default GallerySection;
