
import React, { useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Camera, ChevronLeft, ChevronRight, Instagram } from 'lucide-react';

// Helper component for Magnetic Button Effect
const MagneticButton: React.FC<{ children: React.ReactNode; onClick: () => void; className?: string }> = ({ children, onClick, className }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = buttonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };

  const handleMouseLeave = () => {
    const btn = buttonRef.current;
    if (!btn) return;
    btn.style.transform = 'translate(0px, 0px)';
  };

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-200 ease-out ${className}`}
    >
      {children}
    </button>
  );
};

const VideoSection: React.FC = () => {
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);

  const videos = [
    {
        id: 'e43e861c38096f3435825fa30544024c',
        title: 'Video 1'
    },
    {
        id: 'dd38840955fcdabad1c44a2a52f06159',
        title: 'Video 2'
    }
  ];

  // Generate paths for /images/mane folder
  const maneImages = Array.from({ length: 10 }, (_, i) => `/images/mane/${i + 1}.webp`);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 280 : 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-24 md:py-32 bg-light-bg dark:bg-gray-950 relative overflow-hidden transition-colors duration-500 border-t border-gray-200 dark:border-gray-900">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-electric-blue/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 animate-fade-in-up">
            <div className="max-w-2xl">
                <span className="text-electric-blue dark:text-emerald-400 font-bold tracking-[0.2em] uppercase text-xs border border-electric-blue/30 dark:border-emerald-500/30 bg-electric-blue/10 dark:bg-emerald-500/10 px-4 py-1.5 rounded-full inline-block mb-4 shadow-[0_0_10px_rgba(37,99,235,0.2)] dark:shadow-[0_0_10px_rgba(16,185,129,0.2)] select-none">
                    {t.video?.subtitle || 'Медиа'}
                </span>
                <h2 className="text-4xl md:text-6xl font-heading font-black text-deep-slate dark:text-white leading-[0.9] tracking-tight text-balance select-none">
                    {t.video?.title || 'Приключения в Движении'}
                </h2>
            </div>
            
            <div className="flex items-center gap-2 select-none">
                 <a href="https://www.instagram.com/dankevich__adventure" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full border border-gray-200 dark:border-gray-700 hover-hover:hover:bg-gray-100 dark:hover-hover:hover:bg-gray-800 transition-colors text-xs font-bold uppercase tracking-widest flex items-center gap-2 text-deep-slate dark:text-white min-h-[44px]">
                    <Instagram className="w-4 h-4" />
                    <span>Больше в Instagram</span>
                 </a>
            </div>
        </div>

        {/* 1. VIDEO GRID (Cinematic) */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-20">
            {videos.map((video) => (
                <div key={video.id} className="group relative aspect-video rounded-[2rem] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 bg-black animate-fade-in hover-hover:hover:shadow-[0_0_30px_rgba(0,0,0,0.3)] transition-all duration-500 transform hover-hover:hover:-translate-y-1">
                    <iframe 
                        width="100%" 
                        height="100%" 
                        src={`https://rutube.ru/play/embed/${video.id}`} 
                        frameBorder="0" 
                        allow="clipboard-write; autoplay" 
                        allowFullScreen
                        className="w-full h-full relative z-10"
                    ></iframe>
                    
                    {/* Decorative Border Glow */}
                    <div className="absolute inset-0 border-2 border-white/5 rounded-[2rem] pointer-events-none z-20"></div>
                </div>
            ))}
        </div>

        {/* 2. PHOTO CAROUSEL (The "Mane" Collection) */}
        <div className="relative">
            
            {/* Carousel Header & Controls */}
            <div className="flex justify-between items-center mb-8 px-2 select-none">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-electric-blue/10 dark:bg-emerald-500/10 flex items-center justify-center">
                        <Camera className="w-5 h-5 text-electric-blue dark:text-emerald-500" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-heading font-bold text-deep-slate dark:text-white">
                        Фотохроника
                    </h3>
                </div>

                <div className="hidden md:flex gap-2">
                    <MagneticButton 
                        onClick={() => scroll('left')}
                        className="w-14 h-14 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center hover-hover:hover:bg-gray-100 dark:hover-hover:hover:bg-gray-800 transition-colors active:scale-95 text-deep-slate dark:text-white"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </MagneticButton>
                    <MagneticButton 
                        onClick={() => scroll('right')}
                        className="w-14 h-14 rounded-full bg-deep-slate dark:bg-white text-white dark:text-black flex items-center justify-center hover-hover:hover:opacity-90 transition-opacity active:scale-95 shadow-lg"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </MagneticButton>
                </div>
            </div>

            {/* The Film Strip with Snap Scrolling */}
            {/* Removed touch-pan-y to enable native horizontal scrolling */}
            <div 
                ref={scrollRef}
                className="flex gap-4 md:gap-6 overflow-x-auto pb-12 pt-4 px-2 snap-x snap-mandatory hide-scrollbar"
                style={{ scrollPaddingLeft: '1rem', scrollPaddingRight: '1rem' }}
            >
                {maneImages.map((src, index) => (
                    <div 
                        key={index}
                        className="relative flex-shrink-0 w-[280px] md:w-[350px] aspect-[3/4] rounded-[2rem] group snap-center cursor-pointer bg-gray-200 dark:bg-gray-800 select-none"
                        style={{ 
                            isolation: 'isolate', 
                            borderRadius: '2rem', 
                            overflow: 'hidden',
                            transform: 'translateZ(0)', // Force GPU layer
                            WebkitMaskImage: '-webkit-radial-gradient(white, black)' // Fix for Safari border-radius clipping
                        }}
                    >
                        {/* Image Container with Scale Effect */}
                        <div className="w-full h-full overflow-hidden rounded-[2rem]">
                            <img 
                                src={src} 
                                alt={`Adventure ${index + 1}`} 
                                className="w-full h-full object-cover transition-transform duration-700 ease-out hover-hover:group-hover:scale-110"
                                loading={index === 0 ? "eager" : "lazy"}
                                // @ts-ignore
                                fetchpriority={index === 0 ? "high" : "auto"}
                                onError={(e) => { e.currentTarget.parentElement!.parentElement!.style.display = 'none'; }}
                                draggable={false}
                            />
                        </div>
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-100 md:opacity-0 md:hover-hover:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-[2rem]"></div>

                        {/* Hover Content */}
                        <div className="absolute bottom-0 left-0 w-full p-6 translate-y-0 md:translate-y-4 md:hover-hover:group-hover:translate-y-0 opacity-100 md:opacity-0 md:hover-hover:group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest">
                                Galagon
                             </div>
                        </div>
                    </div>
                ))}
                
                {/* "More" Card at the end */}
                <a 
                    href="https://www.instagram.com/kos_kor_a" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-[200px] md:w-[250px] aspect-[3/4] rounded-[2rem] flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 border-2 border-dashed border-gray-300 dark:border-gray-700 snap-center group hover-hover:hover:border-electric-blue dark:hover-hover:hover:border-emerald-500 transition-colors cursor-pointer select-none"
                >
                    <div className="w-16 h-16 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center mb-4 hover-hover:group-hover:scale-110 transition-transform shadow-sm">
                        <Instagram className="w-8 h-8 text-gray-400 hover-hover:group-hover:text-electric-blue dark:hover-hover:group-hover:text-emerald-500 transition-colors" />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-wide text-gray-500 hover-hover:group-hover:text-deep-slate dark:hover-hover:group-hover:text-white transition-colors">Смотреть все</span>
                </a>
            </div>

        </div>

      </div>
    </section>
  );
};

export default VideoSection;
