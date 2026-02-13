import React, { useState, useEffect } from 'react';
import { Quote, Instagram, MessageSquare, X, Send, Utensils } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSwipe } from '../hooks/useSwipe';

const TeamSection: React.FC = () => {
  const { team, t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewMemberName, setReviewMemberName] = useState('');
  const [reviewText, setReviewText] = useState('');
  
  // Honeypot state for anti-spam
  const [honeypot, setHoneypot] = useState('');

  // Avocado Mode State
  const [avocadoEmojis, setAvocadoEmojis] = useState<{id: number, left: number, delay: number}[]>([]);

  const changeSlide = (index: number) => {
    if (index === activeIndex || isAnimating) return;
    setIsAnimating(true);
    setActiveIndex(index);
  };

  const nextSlide = () => {
    changeSlide((activeIndex + 1) % team.length);
  };

  const prevSlide = () => {
    changeSlide((activeIndex - 1 + team.length) % team.length);
  };

  // Swipe handlers
  const swipeHandlers = useSwipe({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 600);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  // Effect for Avocado Mode
  useEffect(() => {
    if (team[activeIndex]?.id === 'avocado') {
      // Generate rain
      const drops = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2
      }));
      setAvocadoEmojis(drops);
    } else {
      setAvocadoEmojis([]);
    }
  }, [activeIndex, team]);

  const openReviewModal = (name: string) => {
    setReviewMemberName(name);
    setIsReviewModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
    setReviewText('');
    setHoneypot(''); // Reset honeypot
    document.body.style.overflow = 'auto';
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Anti-Spam Check
    if (honeypot) {
      console.log("Spam detected and blocked.");
      closeReviewModal();
      return;
    }

    if (reviewMemberName === 'Авокадо' || reviewMemberName === 'Avocado') {
       alert('🥑: "Ом-ном-ном! Спасибо!" / "Yum-yum! Thanks!"');
    } else {
       alert(`${t.common.submitted}`);
    }
    closeReviewModal();
  };

  const activeMember = team[activeIndex];
  const isAvocadoActive = activeMember.id === 'avocado';
  const isLongName = activeMember.name.length > 8;

  return (
    <section 
      // FIX: Mobile uses py-4 and min-h-[100dvh] to fill screen exactly
      className={`py-4 md:py-32 min-h-[100dvh] flex flex-col justify-center overflow-hidden relative transition-all duration-700 ease-in-out select-none ${
        isAvocadoActive 
          ? 'bg-gradient-to-br from-green-50 to-yellow-50 dark:from-green-900/40 dark:to-yellow-900/20' 
          : 'bg-white dark:bg-black'
      }`}
    >
      {/* Cinematic Background Gradients (Standard) */}
      <div className={`absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[150px] pointer-events-none translate-x-1/3 -translate-y-1/3 transition-colors duration-700 ${isAvocadoActive ? 'bg-green-400/20' : 'bg-electric-blue/5 dark:bg-emerald-900/10'}`}></div>
      <div className={`absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none -translate-x-1/3 translate-y-1/3 transition-colors duration-700 ${isAvocadoActive ? 'bg-yellow-400/20' : 'bg-purple-500/5 dark:bg-purple-900/10'}`}></div>

      {/* AVOCADO RAIN EFFECT */}
      {isAvocadoActive && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {avocadoEmojis.map((drop) => (
            <div
              key={drop.id}
              className="absolute text-2xl animate-fall"
              style={{
                left: `${drop.left}%`,
                top: '-50px',
                animationDuration: `${2 + Math.random()}s`,
                animationDelay: `${drop.delay}s`,
                opacity: 0.6
              }}
            >
              🥑
            </div>
          ))}
        </div>
      )}

      {/* Main Container - Added h-full and flex-col for centering */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col justify-center h-full">
        
        {/* Section Header - Reduced margin on mobile */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 md:mb-24 gap-2 md:gap-6 animate-fade-in-up shrink-0">
           <div>
             <span className={`font-bold tracking-[0.2em] uppercase text-xs mb-2 md:mb-4 block transition-colors ${isAvocadoActive ? 'text-green-600 dark:text-green-400' : 'text-electric-blue dark:text-emerald-400'}`}>
                {t.team.pride}
             </span>
             <h2 className="text-4xl md:text-7xl font-heading font-black text-deep-slate dark:text-white leading-[0.9] tracking-tight">
               {t.team.title}
             </h2>
           </div>
           <p className="text-gray-500 dark:text-gray-400 text-sm md:text-lg font-light max-w-sm text-balance md:text-right hidden md:block">
              {t.team.subtitle}
           </p>
        </div>

        {/* Immersive Team Display */}
        <div className="relative w-full flex-1 flex flex-col justify-center" {...swipeHandlers}>
            
            <div className="flex flex-col md:flex-row h-full gap-4 md:gap-16 items-center">
                
                {/* Left: Interactive Portrait (The Hero) */}
                {/* FIX: h-[50dvh] on mobile to take exactly half screen height */}
                <div className="w-full md:w-5/12 relative h-[50dvh] md:h-auto md:aspect-[3/4] lg:aspect-[4/5] order-1 md:order-2 group rounded-[2.5rem] overflow-hidden">
                    {/* Abstract Frame */}
                    <div className={`absolute inset-0 rounded-[2.5rem] border bg-gray-100 backdrop-blur-sm -rotate-3 transition-all duration-700 hover-hover:group-hover:-rotate-6 scale-95
                        ${isAvocadoActive 
                            ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20' 
                            : 'border-gray-200 dark:border-gray-800 dark:bg-gray-900/50'
                        }
                    `}></div>
                    
                    {/* Main Image Container */}
                    <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden shadow-2xl transition-transform duration-700 hover-hover:group-hover:scale-[1.02] hover-hover:group-hover:-translate-y-2 z-10">
                         {/* Image Transition Logic */}
                         {team.map((member, idx) => (
                             <img 
                               key={idx}
                               src={member.image} 
                               alt={member.name}
                               className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 ease-out ${
                                   idx === activeIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                               }`}
                             />
                         ))}
                         
                         {/* Gradient Overlay */}
                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 md:opacity-20 transition-opacity"></div>
                    </div>
                </div>

                {/* Right: Info & Story */}
                <div className="w-full md:w-7/12 flex flex-col justify-center order-2 md:order-1 relative z-20">
                    
                    <div key={activeIndex} className="animate-fade-in-up">
                        
                        {/* Role Badge */}
                        <div className="flex items-center gap-3 mb-2 md:mb-6">
                            <span className={`h-px w-8 md:w-12 ${isAvocadoActive ? 'bg-green-500' : 'bg-electric-blue dark:bg-emerald-500'}`}></span>
                            <span className={`font-bold uppercase tracking-widest text-xs md:text-sm ${isAvocadoActive ? 'text-green-600 dark:text-green-400' : 'text-electric-blue dark:text-emerald-400'}`}>
                                {activeMember.role}
                            </span>
                        </div>

                        {/* Massive Name */}
                        <h3 className={`font-heading font-black leading-[0.9] tracking-tighter mb-4 md:mb-8 drop-shadow-sm pb-1 md:pb-4 pr-4 transition-all duration-300 flex flex-wrap items-center
                            ${isLongName 
                                ? 'text-4xl sm:text-5xl md:text-7xl lg:text-8xl'  
                                : 'text-5xl sm:text-7xl md:text-8xl lg:text-9xl' 
                            }
                        `}>
                            <span className={`bg-clip-text text-transparent bg-gradient-to-br
                                ${isAvocadoActive
                                    ? 'from-green-700 to-yellow-500 dark:from-green-400 dark:to-yellow-300 animate-pulse-slow'
                                    : 'from-gray-900 to-gray-500 dark:from-white dark:to-gray-500'
                                }
                            `}>
                                {activeMember.name}
                            </span>
                            
                            {isAvocadoActive && (
                                <span className="ml-2 md:ml-4 inline-block animate-bounce filter drop-shadow-lg text-4xl md:text-7xl align-middle">
                                    🥑
                                </span>
                            )}
                        </h3>

                        {/* The Story - Hidden on very small screens if needed, but kept here for now */}
                        <div className={`relative pl-6 md:pl-8 border-l-2 mb-6 md:mb-10 max-w-xl ${isAvocadoActive ? 'border-green-300 dark:border-green-700' : 'border-gray-200 dark:border-gray-800'}`}>
                            <Quote className={`absolute -top-3 -left-4 w-6 h-6 md:w-8 md:h-8 p-1 transition-colors ${isAvocadoActive ? 'text-green-500 bg-transparent' : 'text-gray-300 dark:text-gray-700 bg-white dark:bg-black'}`} />
                            <p className="text-base md:text-2xl text-gray-600 dark:text-gray-300 font-light leading-relaxed italic line-clamp-3 md:line-clamp-none">
                                "{activeMember.desc}"
                            </p>
                        </div>

                        {/* Action Dock */}
                        <div className="flex flex-wrap items-center gap-2 md:gap-4">
                            {activeMember.instagram ? (
                                <a 
                                href={activeMember.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 md:px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white hover-hover:hover:bg-gradient-to-r hover-hover:hover:from-purple-500 hover-hover:hover:to-pink-500 hover-hover:hover:text-white transition-all font-bold text-xs md:text-sm uppercase tracking-wide flex items-center gap-2 group min-h-[44px]"
                                >
                                <Instagram className="w-4 h-4 hover-hover:group-hover:scale-110 transition-transform" />
                                <span className="hidden md:inline">Instagram</span>
                                </a>
                            ) : (
                                <button disabled className="px-4 md:px-6 py-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 text-gray-400 cursor-not-allowed font-bold text-xs md:text-sm uppercase tracking-wide flex items-center gap-2 min-h-[44px]">
                                <Instagram className="w-4 h-4" />
                                <span className="hidden md:inline">Instagram</span>
                                </button>
                            )}
                            
                            <button 
                                onClick={() => openReviewModal(activeMember.name)}
                                className={`px-4 md:px-6 py-3 rounded-xl border transition-all font-bold text-xs md:text-sm uppercase tracking-wide flex items-center gap-2 min-h-[44px]
                                    ${isAvocadoActive 
                                        ? 'border-green-500 text-green-700 dark:text-green-400 hover-hover:hover:bg-green-500 hover-hover:hover:text-white hover-hover:hover:scale-105 shadow-lg shadow-green-200 dark:shadow-green-900/20' 
                                        : 'border-gray-200 dark:border-gray-700 hover-hover:hover:border-electric-blue dark:hover-hover:hover:border-emerald-500 text-gray-900 dark:text-white hover-hover:hover:text-electric-blue dark:hover-hover:hover:text-emerald-400'
                                    }
                                `}
                            >
                                {isAvocadoActive ? <Utensils className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
                                {isAvocadoActive ? 'Feed Me!' : t.team.reviewBtn}
                            </button>
                        </div>
                    </div>

                    {/* Team "Dock" Navigation (Desktop) */}
                    <div className="hidden md:flex items-center gap-3 mt-16 pt-8 border-t border-gray-100 dark:border-gray-900">
                        {team.map((member, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveIndex(idx)}
                                className={`relative group transition-all duration-300 ${idx === activeIndex ? 'w-20' : 'w-14 hover-hover:hover:w-16'}`}
                            >
                                <div className={`w-full aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
                                    idx === activeIndex 
                                    ? (isAvocadoActive ? 'border-green-500 ring-2 ring-green-500/20' : 'border-electric-blue dark:border-emerald-500 ring-2 ring-electric-blue/20 dark:ring-emerald-500/20 shadow-lg')
                                    : 'border-transparent opacity-50 grayscale hover-hover:hover:opacity-100 hover-hover:hover:grayscale-0'
                                }`}>
                                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                </div>
                                {/* Tooltip */}
                                <span className={`absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-wider text-gray-900 dark:text-white whitespace-nowrap transition-all duration-300 ${idx === activeIndex ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
                                    {member.name}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Mobile Dots */}
                    <div className="flex md:hidden gap-2 mt-4 justify-center">
                         {team.map((_, idx) => (
                            <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeIndex ? (isAvocadoActive ? 'w-8 bg-green-500' : 'w-8 bg-electric-blue dark:bg-emerald-500') : 'w-2 bg-gray-300 dark:bg-gray-800'}`} />
                         ))}
                    </div>

                </div>
            </div>
        </div>
      </div>

      {/* Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={closeReviewModal}></div>
          <div className="bg-white dark:bg-gray-900 rounded-[2rem] shadow-2xl w-full max-w-lg relative z-10 overflow-hidden animate-scale-in border border-gray-200 dark:border-gray-800">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <div>
                    <h3 className="text-2xl font-black font-heading text-deep-slate dark:text-white leading-none">
                        {isAvocadoActive ? 'Treats for Avocado' : t.team.reviewBtn}
                    </h3>
                    <p className="text-electric-blue dark:text-emerald-400 font-bold mt-1 text-sm uppercase tracking-wider">
                        To: {reviewMemberName}
                    </p>
                </div>
                <button onClick={closeReviewModal} className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover-hover:hover:bg-gray-200 dark:hover-hover:hover:bg-gray-700 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                {/* Honeypot Field - Hidden from users */}
                <div style={{ display: 'none', opacity: 0, position: 'absolute', left: '-9999px' }}>
                   <label htmlFor="website">Website</label>
                   <input 
                     type="text" 
                     id="website" 
                     name="website" 
                     value={honeypot}
                     onChange={(e) => setHoneypot(e.target.value)}
                     tabIndex={-1}
                     autoComplete="off"
                   />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">{isAvocadoActive ? 'What tasty treat?' : t.common.message}</label>
                  <textarea 
                    required
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder={isAvocadoActive ? 'Steak? Chocolate? Bones?' : t.modal.reviewTextPlaceHolder}
                    className="w-full h-40 px-5 py-4 bg-gray-50 dark:bg-gray-950/50 border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-electric-blue dark:focus:ring-emerald-500 outline-none resize-none text-deep-slate dark:text-gray-200 transition-all placeholder:text-gray-400"
                  ></textarea>
                </div>
                
                <div className="flex gap-3 pt-2">
                  <button 
                    type="button" 
                    onClick={closeReviewModal}
                    className="flex-1 py-4 rounded-xl font-bold text-gray-500 dark:text-gray-400 hover-hover:hover:bg-gray-100 dark:hover-hover:hover:bg-gray-800 transition-colors text-sm uppercase tracking-wide min-h-[44px]"
                  >
                    {t.common.cancel}
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-4 rounded-xl font-bold text-white bg-electric-blue dark:bg-emerald-600 hover-hover:hover:bg-blue-600 dark:hover-hover:hover:bg-emerald-500 shadow-lg shadow-electric-blue/20 dark:shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wide hover-hover:hover:scale-[1.02] min-h-[44px]"
                  >
                    {isAvocadoActive ? <Utensils className="w-4 h-4" /> : <Send className="w-4 h-4" />} 
                    {isAvocadoActive ? 'Feed' : t.common.send}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateY(600px) rotate(360deg); opacity: 0; }
        }
        .animate-fall {
           animation-name: fall;
           animation-timing-function: linear;
           animation-iteration-count: infinite;
        }
      `}</style>
    </section>
  );
};

export default TeamSection;