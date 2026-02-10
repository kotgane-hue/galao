import React, { useState, useEffect } from 'react';
import { Wind, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';

const GodSection: React.FC = () => {
  const { t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Images for the legend section
  const legendImages = [
    "/images/legendgalagon/1.webp",
    "/images/legendgalagon/2.webp",
    "/images/legendgalagon/3.webp"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % legendImages.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // Flash UI: Staggered Word Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: 0.2
      }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 10, filter: 'blur(5px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.4 } }
  };

  return (
    <section className="relative py-24 md:py-32 lg:py-48 overflow-hidden bg-gray-50 dark:bg-gray-950 transition-colors duration-700">
      
      {/* 1. MASSIVE TYPOGRAPHY TEXTURE (Background) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none z-0">
         <h1 className="text-[18vw] font-black leading-none text-gray-200/50 dark:text-gray-900/40 tracking-tighter hidden md:block md:mix-blend-multiply md:dark:mix-blend-overlay blur-[2px]">
            {t.god.bgText}
         </h1>
         <h1 className="text-[18vw] font-black leading-none text-gray-200/30 dark:text-gray-900/20 tracking-tighter md:hidden">
            {t.god.bgText}
         </h1>
      </div>

      {/* 2. ATMOSPHERIC GRADIENTS */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-electric-blue/5 dark:bg-emerald-900/10 rounded-full blur-[150px] motion-safe:animate-pulse-slow pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/5 dark:bg-purple-900/10 rounded-full blur-[150px] motion-safe:animate-pulse-slow pointer-events-none" style={{ animationDelay: '1s' }}></div>

      {/* 3. WIND EFFECT (SVG Overlay) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-30 dark:opacity-20" preserveAspectRatio="none">
        <path 
           d="M-100,100 C200,50 400,200 600,100 S1000,50 1400,150" 
           fill="none" 
           stroke="currentColor" 
           strokeWidth="2" 
           className="text-gray-300 dark:text-gray-700 motion-safe:animate-wind-flow"
           strokeDasharray="10 20"
        />
        <path 
           d="M-100,300 C300,250 500,400 900,300 S1500,250 1800,350" 
           fill="none" 
           stroke="currentColor" 
           strokeWidth="1" 
           className="text-electric-blue dark:text-emerald-500 motion-safe:animate-wind-flow" 
           style={{ animationDuration: '12s' }}
           strokeDasharray="20 40"
        />
        <path 
           d="M-100,600 C100,550 600,700 800,600 S1200,500 1600,650" 
           fill="none" 
           stroke="currentColor" 
           strokeWidth="3" 
           className="text-gray-300 dark:text-gray-800 motion-safe:animate-wind-flow"
           style={{ animationDuration: '15s', opacity: 0.5 }}
           strokeDasharray="5 15"
        />
      </svg>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          
          {/* IMAGE BLOCK (Left - 5 cols) */}
          <div className="lg:col-span-5 relative group order-2 lg:order-1">
            <div className="relative aspect-square md:aspect-[3/4] lg:aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl transition-transform duration-700 group-hover:scale-[1.02] bg-gray-200 dark:bg-gray-800">
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-20 opacity-60"></div>
               <div className="absolute inset-0 opacity-[0.08] z-20 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22 opacity=%221%22/%3E%3C/svg%3E")' }}></div>
               
               {legendImages.map((src, index) => (
                 <img 
                   key={index}
                   src={src} 
                   alt="Spirit of Galagon" 
                   // @ts-ignore
                   fetchpriority={index === 0 ? "high" : "auto"}
                   loading={index === 0 ? "eager" : "lazy"}
                   decoding="async"
                   className={`absolute inset-0 w-full h-full object-cover transform transition-all duration-[2000ms] ${index === currentImageIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
                 />
               ))}

               <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/10 dark:bg-black/40 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg animate-float z-30">
                  <Sparkles className="w-5 h-5 text-yellow-300 mb-3" />
                  <p className="text-white font-heading font-bold text-lg leading-snug drop-shadow-md">
                    {t.god.quote}
                  </p>
               </div>
            </div>
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-electric-blue/10 dark:bg-emerald-500/10 rounded-full blur-3xl -z-10 animate-breathe"></div>
          </div>

          {/* TEXT BLOCK (Right - 7 cols) */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-sm mb-8 animate-fade-in-up">
               <Wind className="w-4 h-4 text-electric-blue dark:text-emerald-400 animate-pulse" />
               <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-300">
                  {t.god.tag}
               </span>
            </div>

            <h2 className="text-4xl md:text-6xl lg:text-8xl font-heading font-black text-gray-900 dark:text-white leading-[0.9] tracking-tight mb-8 animate-fade-in-up text-balance" style={{ animationDelay: '0.1s' }}>
              {t.god.titlePart1} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-purple-600 dark:from-emerald-400 dark:to-cyan-400 whitespace-pre-wrap">
                {t.god.titlePart2.replace(/^\s([а-яА-Яa-zA-Z])/, '\u00A0$1')}
              </span>
            </h2>

            {/* Flash UI: Layout Structure with Gradient Line */}
            <div className="flex gap-6 md:gap-8">
               
               {/* Accent Line */}
               <div className="hidden md:block w-1 rounded-full bg-gradient-to-b from-electric-blue via-purple-500 to-transparent dark:from-emerald-400 dark:to-transparent h-auto opacity-70"></div>

               {/* Staggered Text Reveal */}
               <div className="space-y-6 text-lg md:text-xl font-light text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                 
                 <motion.p 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                 >
                    {/* Drop Cap styling applied to the first span/word */}
                    <span className="float-left text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-electric-blue to-purple-600 dark:from-emerald-400 dark:to-teal-500 mr-3 -mt-2 leading-none drop-shadow-sm">
                       {t.god.desc1.charAt(0)}
                    </span>
                    {/* Rest of the text staggered */}
                    {t.god.desc1.slice(1).split(" ").map((word, i) => (
                      <motion.span key={i} variants={wordVariants} className="inline-block mr-1.5">
                        {word}
                      </motion.span>
                    ))}
                 </motion.p>
                 
                 <motion.p 
                    className="text-gray-500 dark:text-gray-400 text-base border-l-2 md:border-l-0 border-gray-200 dark:border-gray-800 pl-4 md:pl-0"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                 >
                    {t.god.desc2.split(" ").map((word, i) => (
                      <motion.span key={i} variants={wordVariants} className="inline-block mr-1">
                        {word}
                      </motion.span>
                    ))}
                 </motion.p>
               </div>
            </div>

            <div className="mt-12 flex items-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
               <div className="h-px flex-1 bg-gradient-to-r from-gray-200 dark:from-gray-800 to-transparent"></div>
               <div className="flex gap-2">
                  <span className="w-2 h-2 rounded-full bg-electric-blue dark:bg-emerald-500 animate-bounce" style={{ animationDelay: '0s' }}></span>
                  <span className="w-2 h-2 rounded-full bg-electric-blue dark:bg-emerald-500 animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                  <span className="w-2 h-2 rounded-full bg-electric-blue dark:bg-emerald-500 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
               </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default GodSection;