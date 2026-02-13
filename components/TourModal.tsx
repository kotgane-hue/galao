
import React, { useState, useEffect, useRef } from 'react';
import { X, Clock, MapPin, Zap, Check, Backpack, Calendar, ArrowRight, CheckCircle, Image as ImageIcon, ChevronDown, ChevronUp, Info, ChevronLeft, Mountain, Share2, User, Shield } from 'lucide-react';
import { Tour, TourDate } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { useSwipe } from '../hooks/useSwipe';
import SEO from './SEO';
import { vibrate } from '../utils/vibrate';
import TourInfoBlock from './TourInfoBlock';

interface TourModalProps {
  tour: Tour | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const TourModal: React.FC<TourModalProps> = ({ tour, onClose, onNext, onPrev }) => {
  const { t, language, bookTour, cancelBooking } = useLanguage();
  const [myBookings, setMyBookings] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [activeImage, setActiveImage] = useState<string>('');
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isMobileFullView, setIsMobileFullView] = useState(false);
  
  // Accordion States
  const [isDescOpen, setIsDescOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false); // New state for details
  const [isDatesOpen, setIsDatesOpen] = useState(false); 
  const [isGearOpen, setIsGearOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(true);

  // Interactive Gear Checklist State
  const [checkedGear, setCheckedGear] = useState<number[]>([]);

  // Mobile Gallery Lightbox State
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  
  // Track broken images to exclude them from lightbox count
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  // Share State
  const [isCopied, setIsCopied] = useState(false);

  // Touch handling for vertical swipe (Main Cards)
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    if (tour) {
      setIsMounted(true);
      setActiveImage(tour.image);
      setIsDescOpen(false);
      setIsDetailsOpen(false);
      setIsDatesOpen(false);
      setIsGearOpen(false);
      setIsGalleryOpen(true);
      setCheckedGear([]); // Reset checklist on new tour
      setIsImageLoading(true);
      setFailedImages(new Set()); // Reset failed images tracker
      setIsMobileFullView(false);
    }
  }, [tour]);

  useEffect(() => {
      // Trigger loading state when image changes
      setIsImageLoading(true);
  }, [activeImage]);

  // Robust Scroll Lock
  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (window.innerWidth >= 768) return; // Only mobile logic
    const scrollTop = e.currentTarget.scrollTop;
    
    if (scrollTop > 50 && !isMobileFullView) {
      setIsMobileFullView(true);
    } 
    else if (scrollTop < 10 && isMobileFullView) {
      setIsMobileFullView(false);
    }
  };

  if (!tour) return null;

  const allPotentialImages = [tour.image, ...(tour.gallery || [])].slice(0, 35);
  const validGalleryImages = allPotentialImages.filter(img => !failedImages.has(img));

  const handleImageError = (img: string) => {
    setFailedImages(prev => {
        const next = new Set(prev);
        next.add(img);
        return next;
    });
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };
    const date = new Date(dateString);
    return date.toLocaleDateString(language, options);
  };

  const getYear = (dateString: string) => new Date(dateString).getFullYear();

  const handleBookDate = (e: React.MouseEvent, tourDate: any) => {
    e.stopPropagation();
    vibrate(15);
    const isAlreadyBooked = myBookings.includes(tourDate.startDate);
    if (isAlreadyBooked) {
        cancelBooking(tour.id, tourDate.startDate);
        setMyBookings(prev => prev.filter(d => d !== tourDate.startDate));
    } else {
        if (tourDate.bookedSpots >= tourDate.totalSpots) {
            alert("Мест нет");
            return;
        }
        bookTour(tour.id, tourDate.startDate);
        setMyBookings(prev => [...prev, tourDate.startDate]);
        
        const dateStr = tourDate.startDate === tourDate.endDate 
            ? `${formatDate(tourDate.startDate)} ${getYear(tourDate.startDate)}`
            : `${formatDate(tourDate.startDate)} — ${formatDate(tourDate.endDate)} ${getYear(tourDate.endDate)}`;
            
        const message = `Здравствуйте! Хочу записаться на тур "${tour.title}". Даты: ${dateStr}.`;
        const telegramUrl = `https://t.me/Galagon_support_bot?text=${encodeURIComponent(message)}`;
        window.open(telegramUrl, '_blank');
    }
  };

  const handleGeneralBooking = () => {
    vibrate(15);
    const message = `Здравствуйте! Хочу записаться на тур "${tour.title}".`;
    const url = `https://t.me/Galagon_support_bot?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleIndividualBooking = () => {
    vibrate(15);
    const message = `Здравствуйте! Меня интересует индивидуальный тур "${tour.title}" (даты не подходят).`;
    const url = `https://t.me/Galagon_support_bot?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const toggleGearItem = (index: number) => {
    vibrate(5);
    setCheckedGear(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const handleGalleryClick = (img: string) => {
    vibrate(10);
    if (window.innerWidth < 768) {
      setLightboxImage(img);
    } else {
      setActiveImage(img);
    }
  };

  const handleLightboxNext = () => {
    vibrate(10);
    if (!lightboxImage) return;
    const currentIndex = validGalleryImages.indexOf(lightboxImage);
    const nextIndex = (currentIndex + 1) % validGalleryImages.length;
    setLightboxImage(validGalleryImages[nextIndex]);
  };

  const handleLightboxPrev = () => {
    vibrate(10);
    if (!lightboxImage) return;
    const currentIndex = validGalleryImages.indexOf(lightboxImage);
    const prevIndex = (currentIndex - 1 + validGalleryImages.length) % validGalleryImages.length;
    setLightboxImage(validGalleryImages[prevIndex]);
  };

  const lightboxSwipeHandlers = useSwipe({
    onSwipedLeft: handleLightboxNext,
    onSwipedRight: handleLightboxPrev
  });

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartY.current) return;
    const touchEndY = e.changedTouches[0].clientY;
    const distance = touchStartY.current - touchEndY;
    
    if (distance < -70) {
       vibrate(20);
       handleClose();
       return;
    }
    touchStartY.current = null;
  };

  const handleClose = () => {
    vibrate(20);
    setIsMounted(false); 
    setTimeout(onClose, 300);
  };

  const handleGoHome = () => {
    vibrate(15);
    handleClose();
  };

  const handleShare = async () => {
    vibrate(10);
    const baseUrl = window.location.href.split('#')[0];
    const shareUrl = `${baseUrl}#tour-${tour.id}`;

    const shareData = {
      title: tour.title,
      text: `Погнали в ${tour.title} с Galagon!`,
      url: shareUrl 
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy', err);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-end md:items-center justify-center pointer-events-none">
      
      <SEO 
        title={tour.title}
        description={tour.desc}
        image={tour.image}
        url={`https://galagon.ru/#tour-${tour.id}`}
      />

      <div 
        className={`absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300 pointer-events-auto cursor-pointer ${isMounted ? 'opacity-100' : 'opacity-0'}`} 
        onClick={handleClose}
        style={{ touchAction: 'none' }} 
      />

      <div 
        className={`relative w-full h-[100dvh] md:w-[95vw] md:h-[90vh] bg-white dark:bg-gray-900 md:rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-2xl transition-all duration-500 transform origin-bottom md:origin-center border border-white/10 pointer-events-auto ${isMounted ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-20 scale-95 opacity-0'}`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onClick={(e) => e.stopPropagation()}
      >
        
        <button 
          onClick={handleGoHome}
          className="fixed md:absolute top-4 left-4 md:top-6 md:left-6 z-[9999] px-4 py-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-xl text-white border border-white/20 shadow-2xl active:scale-95 transition-all flex items-center gap-2 group pointer-events-auto"
          style={{ paddingTop: 'max(0.5rem, env(safe-area-inset-top))' }} 
        >
          <Mountain className="w-5 h-5 group-hover:text-electric-blue transition-colors" />
          <span className="font-bold text-xs uppercase tracking-widest hidden sm:inline">Galagon</span>
        </button>

        <div className="fixed md:absolute top-4 right-4 md:top-6 md:right-6 z-[9999] flex gap-3 pointer-events-auto" style={{ paddingTop: 'max(0.5rem, env(safe-area-inset-top))' }}>
            <button 
                onClick={handleShare}
                className="p-3 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-xl text-white border border-white/20 shadow-lg active:scale-95 transition-all"
            >
                {isCopied ? <Check className="w-6 h-6 text-emerald-400" /> : <Share2 className="w-6 h-6" />}
            </button>
            <button 
                onClick={handleClose} 
                className="p-3 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-xl text-white/90 hover:text-white transition-all border border-white/20 hover:scale-105 active:scale-95 shadow-lg"
            >
                <X className="w-6 h-6 md:w-8 md:h-8" />
            </button>
        </div>

        {/* LEFT COLUMN */}
        <div 
          className={`w-full md:w-[55%] lg:w-[60%] relative overflow-hidden group bg-gray-900 shrink-0 select-none touch-pan-y transition-all duration-500 ease-in-out ${isMobileFullView ? 'h-0 opacity-0' : 'h-[40dvh] opacity-100'} md:h-full md:opacity-100`}
        >
           <div className="absolute inset-0 bg-gray-800 z-0 flex items-center justify-center">
                 <Mountain className="w-12 h-12 text-gray-700 animate-bounce" />
           </div>

           <img 
             key={activeImage}
             src={activeImage} 
             alt={tour.title} 
             className="absolute inset-0 w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110 z-10"
             draggable={false}
             onLoad={() => setIsImageLoading(false)}
           />
           <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/10 to-transparent md:bg-gradient-to-r md:from-gray-950/90 md:via-gray-900/20 md:to-transparent z-20" />
           
           <div 
             className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black/60 to-transparent hidden md:flex justify-center items-start pt-6 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-40"
             onClick={() => { vibrate(10); onPrev(); }}
           >
              <div className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/30 transition-colors">
                <ChevronUp className="w-8 h-8 text-white" />
              </div>
           </div>

           <div 
             className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/60 to-transparent hidden md:flex justify-center items-end pb-6 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-40 pointer-events-auto"
             onClick={(e) => { e.stopPropagation(); vibrate(10); onNext(); }}
           >
              <div className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/30 transition-colors">
                <ChevronDown className="w-8 h-8 text-white" />
              </div>
           </div>

           <div className={`absolute bottom-0 left-0 w-full p-6 md:p-12 text-white pointer-events-none z-30 transition-opacity duration-300 ${isMobileFullView ? 'opacity-0' : 'opacity-100'}`}>
              <div className="flex flex-wrap gap-2 mb-2 md:mb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                     <Zap className="w-3 md:w-3.5 h-3 md:h-3.5 text-yellow-400" />
                     {tour.difficulty}
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                     <MapPin className="w-3 md:w-3.5 h-3 md:h-3.5 text-electric-blue" />
                     {tour.location}
                  </div>
              </div>
              
              <h2 className="text-3xl md:text-6xl lg:text-7xl font-heading font-black leading-[0.9] mb-4 md:mb-6 drop-shadow-xl text-balance">
                {tour.title}
              </h2>

              <div className="hidden md:flex gap-8 text-sm font-bold uppercase tracking-wide text-gray-300/80">
                 <span className="flex items-center gap-2"><Clock className="w-5 h-5 text-electric-blue" /> {tour.duration}</span>
                 <span className="flex items-center gap-2"><Backpack className="w-5 h-5 text-electric-blue" /> {tour.category === 'one-day' ? t.calendar.oneDay : t.calendar.multiDay}</span>
              </div>
           </div>
        </div>

        {/* RIGHT COLUMN: Content */}
        <div 
          className={`w-full md:w-[45%] lg:w-[40%] bg-white dark:bg-gray-900 flex flex-col relative z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.2)] transition-all duration-500 ease-in-out md:h-full md:mt-0 md:rounded-none ${isMobileFullView ? 'h-[100dvh] mt-0 rounded-none' : 'h-[60dvh] rounded-t-[2rem] -mt-6'}`}
          onTouchStart={(e) => e.stopPropagation()} 
        >
           <div className={`w-full flex justify-center pt-3 pb-1 md:hidden opacity-50 shrink-0 ${isMobileFullView ? 'hidden' : 'block'}`}>
              <div className="w-12 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700"></div>
           </div>

           <div 
              className="flex-1 overflow-y-auto p-6 md:p-10 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 pb-24 overscroll-contain transition-all duration-300"
              onScroll={handleScroll}
           >
              
              {tour.shortDesc && (
                <div className="mb-8 animate-fade-in pt-4 md:pt-0">
                    <p className="text-lg md:text-xl font-medium text-deep-slate dark:text-white leading-relaxed italic text-balance border-l-4 border-electric-blue dark:border-emerald-500 pl-4 py-1 bg-gray-50 dark:bg-white/5 rounded-r-xl">
                        {tour.shortDesc}
                    </p>
                </div>
              )}

              <div className="mb-4 mt-2 glass-panel rounded-2xl overflow-hidden shadow-sm animate-fade-in-up">
                 <button 
                    onClick={() => { vibrate(10); setIsDescOpen(!isDescOpen); }}
                    className="w-full flex items-center justify-between p-5 hover:bg-white/5 transition-colors"
                 >
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-electric-blue/10 rounded-xl text-electric-blue dark:text-emerald-400">
                           <Info className="w-5 h-5" />
                        </div>
                        <h3 className="text-sm md:text-base font-bold text-deep-slate dark:text-white uppercase tracking-wide">
                           {t.modal.about}
                        </h3>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isDescOpen ? 'rotate-180' : ''}`} />
                 </button>

                 <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isDescOpen ? 'max-h-[1500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="p-5">
                       <p className="text-gray-800 dark:text-gray-100 leading-relaxed text-base md:text-lg font-light text-balance whitespace-pre-line">
                         {tour.desc}
                       </p>
                       <div className="flex md:hidden flex-wrap gap-2 mt-6">
                          <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-900 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800">
                              <Clock className="w-3.5 h-3.5 text-electric-blue" /> {tour.duration}
                          </span>
                       </div>
                    </div>
                 </div>
              </div>
              
              {/* === NEW EXPEDITION ECOSYSTEM BLOCK === */}
              {tour.details && (
                <div className="mb-4 glass-panel rounded-2xl overflow-hidden shadow-sm animate-fade-in-up border border-amber-500/20">
                   <button 
                      onClick={() => { vibrate(10); setIsDetailsOpen(!isDetailsOpen); }}
                      className="w-full flex items-center justify-between p-5 hover:bg-white/5 transition-colors bg-amber-500/5"
                   >
                      <div className="flex items-center gap-4">
                          <div className="p-2 bg-amber-500/10 rounded-xl text-amber-500">
                             <Shield className="w-5 h-5" />
                          </div>
                          <h3 className="text-sm md:text-base font-bold text-deep-slate dark:text-white uppercase tracking-wide">
                             The Expedition Ecosystem
                          </h3>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isDetailsOpen ? 'rotate-180' : ''}`} />
                   </button>

                   <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isDetailsOpen ? 'max-h-[2500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="p-2 md:p-5">
                          <TourInfoBlock details={tour.details} />
                      </div>
                   </div>
                </div>
              )}

              {tour.program && tour.program.length > 0 && (
                <div className="mb-4 glass-panel rounded-2xl overflow-hidden shadow-sm animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                   <button 
                      onClick={() => { vibrate(10); setIsDescOpen(!isDescOpen); }} 
                      className="w-full flex items-center justify-between p-5 hover:bg-white/5 transition-colors"
                   >
                      <div className="flex items-center gap-4">
                          <div className="p-2 bg-orange-500/10 rounded-xl text-orange-500">
                             <MapPin className="w-5 h-5" />
                          </div>
                          <h3 className="text-sm md:text-base font-bold text-deep-slate dark:text-white uppercase tracking-wide">
                             {t.modal.program}
                          </h3>
                      </div>
                   </button>
                   <div className="p-5">
                        <ul className="space-y-4 border-l-2 border-gray-200 dark:border-gray-800 ml-2 pl-6">
                           {tour.program.map((day, idx) => (
                             <li key={idx} className="relative">
                               <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-electric-blue dark:bg-emerald-500 border-2 border-white dark:border-gray-900"></div>
                               <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{day}</p>
                             </li>
                           ))}
                        </ul>
                   </div>
                </div>
              )}

              <div className="mb-4 glass-panel rounded-2xl overflow-hidden shadow-sm">
                 <button 
                    onClick={() => { vibrate(10); setIsDatesOpen(!isDatesOpen); }}
                    className="w-full flex items-center justify-between p-5 hover:bg-white/5 transition-colors"
                 >
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-electric-blue/10 rounded-xl text-electric-blue dark:text-emerald-400">
                           <Calendar className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                            <h3 className="text-sm md:text-base font-bold text-deep-slate dark:text-white uppercase tracking-wide">
                               Ближайшие даты
                            </h3>
                            <p className="text-xs text-gray-500 font-medium mt-0.5">Выберите дату для записи</p>
                        </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isDatesOpen ? 'rotate-180' : ''}`} />
                 </button>

                 <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isDatesOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="p-4 space-y-4 overflow-y-auto max-h-[400px] scrollbar-thin">
                        {tour.dates && tour.dates.length > 0 ? (
                          Object.entries(
                            tour.dates.reduce((groups, date) => {
                              const locale = (language as string) === 'zh' ? 'zh-CN' : (language === 'ru' ? 'ru-RU' : 'en-US');
                              const month = new Date(date.startDate).toLocaleString(locale, { month: 'long' });
                              const key = month.charAt(0).toUpperCase() + month.slice(1);
                              if (!groups[key]) groups[key] = [];
                              groups[key].push(date);
                              return groups;
                            }, {} as Record<string, TourDate[]>)
                          ).map(([monthName, monthDates]) => (
                            <div key={monthName}>
                              <h4 className="sticky top-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm py-2 px-1 text-xs font-black uppercase tracking-widest text-gray-400 z-10 mb-3 border-b border-gray-100 dark:border-gray-800">
                                {monthName}
                              </h4>
                              
                              <div className="space-y-3">
                                {(monthDates as TourDate[]).map((date, idx) => {
                                  const isFull = date.bookedSpots >= date.totalSpots;
                                  const isUserBooked = myBookings.includes(date.startDate);
                                  const isOneDay = date.startDate === date.endDate;

                                  return (
                                    <div 
                                      key={idx}
                                      onClick={(e) => handleBookDate(e, date)}
                                      className={`group relative p-4 rounded-xl border transition-all cursor-pointer overflow-hidden ${
                                          isUserBooked 
                                            ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 shadow-md' 
                                            : (isFull 
                                                ? 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 opacity-60' 
                                                : 'bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-700 hover:border-electric-blue dark:hover:border-emerald-500 hover:shadow-md')
                                      }`}
                                    >
                                       <div className="flex justify-between items-center relative z-10">
                                          <div className="flex flex-col">
                                             <div className="font-bold text-deep-slate dark:text-white text-base md:text-lg">
                                                {isOneDay ? (
                                                    formatDate(date.startDate)
                                                ) : (
                                                    <>{formatDate(date.startDate)} <span className="text-gray-400 font-light mx-1">/</span> {formatDate(date.endDate)}</>
                                                )}
                                             </div>
                                             <div className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-gray-400 mt-1 flex items-center gap-2">
                                                <span>{getYear(date.endDate)}</span>
                                                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                                <span>{tour.groupSizeInfo}</span>
                                             </div>
                                          </div>
                                          
                                          <div className="text-right">
                                             {isUserBooked ? (
                                                <div className="text-emerald-500 font-bold text-xs bg-emerald-100 dark:bg-emerald-900/50 px-3 py-1.5 rounded-lg flex items-center gap-1">
                                                   <CheckCircle className="w-4 h-4" /> <span className="hidden sm:inline">Вы записаны</span>
                                                </div>
                                             ) : isFull ? (
                                                <span className="text-red-400 text-xs font-bold uppercase bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-lg">Мест нет</span>
                                             ) : (
                                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-electric-blue/5 dark:bg-emerald-500/10 text-electric-blue dark:text-emerald-400 group-hover:bg-electric-blue group-hover:text-white dark:group-hover:bg-emerald-500 transition-all flex items-center justify-center">
                                                   <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                                                </div>
                                             )}
                                          </div>
                                       </div>
                                       {!isFull && !isUserBooked && (
                                         <div className="absolute bottom-0 left-0 h-1 bg-gray-100 dark:bg-gray-800 w-full">
                                            <div className="h-full bg-electric-blue dark:bg-emerald-500 transition-all duration-500" style={{ width: `${(date.bookedSpots/date.totalSpots)*100}%` }}></div>
                                         </div>
                                       )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          ))
                        ) : (
                           <div className="text-center py-8 text-gray-400 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl mb-4">
                              <Calendar className="w-8 h-8 mx-auto mb-2 opacity-30" />
                              <span className="text-sm font-medium">Даты формируются</span>
                           </div>
                        )}

                        <div 
                            onClick={handleIndividualBooking}
                            className="group relative p-4 rounded-xl border-2 border-dashed border-electric-blue/20 dark:border-emerald-500/20 bg-electric-blue/5 dark:bg-emerald-500/5 hover:bg-electric-blue/10 dark:hover:bg-emerald-500/10 transition-all cursor-pointer flex items-center justify-between mt-2"
                        >
                            <div>
                                <div className="font-bold text-deep-slate dark:text-white text-sm md:text-base flex items-center gap-2">
                                    <User className="w-4 h-4 text-electric-blue dark:text-emerald-400" />
                                    {t.calendar.orderIndiv}
                                </div>
                                <div className="text-[10px] md:text-xs text-gray-500 font-medium mt-1 ml-6">
                                    Даты не подходят? Организуем специально для вас!
                                </div>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                                <ArrowRight className="w-4 h-4 text-electric-blue dark:text-emerald-500" />
                            </div>
                        </div>
                    </div>
                 </div>
              </div>

              <div className="mb-4 glass-panel rounded-2xl overflow-hidden shadow-sm">
                 <button 
                    onClick={() => { vibrate(10); setIsGearOpen(!isGearOpen); }}
                    className="w-full flex items-center justify-between p-5 hover:bg-white/5 transition-colors"
                 >
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-purple-500/10 rounded-xl text-purple-600 dark:text-purple-400">
                           <Backpack className="w-5 h-5" />
                        </div>
                        <h3 className="text-sm md:text-base font-bold text-deep-slate dark:text-white uppercase tracking-wide">
                           Что взять с собой
                        </h3>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isGearOpen ? 'rotate-180' : ''}`} />
                 </button>

                 <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isGearOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="p-5 overflow-y-auto max-h-[500px] scrollbar-thin">
                        <ul className="space-y-3">
                           {tour.gear.split('\n').map((item, i) => {
                              const isChecked = checkedGear.includes(i);
                              return (
                                <li 
                                    key={i} 
                                    onClick={() => toggleGearItem(i)}
                                    className={`flex items-start gap-3 p-3 rounded-xl transition-all cursor-pointer select-none
                                        ${isChecked 
                                            ? 'bg-emerald-500/10 border border-emerald-500/20' 
                                            : 'hover:bg-gray-50 dark:hover:bg-white/5 border border-transparent'
                                        }
                                    `}
                                >
                                    <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition-colors ${isChecked ? 'bg-emerald-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-transparent'}`}>
                                        <Check className="w-4 h-4" />
                                    </div>
                                    <span className={`text-sm leading-snug transition-all ${isChecked ? 'text-gray-500 dark:text-gray-400 line-through' : 'text-gray-800 dark:text-gray-200'}`}>{item}</span>
                                </li>
                              );
                           })}
                        </ul>
                    </div>
                 </div>
              </div>

              <div className="mb-4 glass-panel rounded-2xl overflow-hidden shadow-sm relative group/gallery">
                 <button 
                    onClick={() => { vibrate(10); setIsGalleryOpen(!isGalleryOpen); }}
                    className="w-full flex items-center justify-between p-5 hover:bg-white/5 transition-colors"
                 >
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-pink-500/10 rounded-xl text-pink-500">
                           <ImageIcon className="w-5 h-5" />
                        </div>
                        <h3 className="text-sm md:text-base font-bold text-deep-slate dark:text-white uppercase tracking-wide">
                           Галерея
                        </h3>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isGalleryOpen ? 'rotate-180' : ''}`} />
                 </button>

                 <div className={`transition-all duration-700 ease-in-out ${isGalleryOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="p-4">
                         
                         <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            <div 
                                onClick={() => handleGalleryClick(tour.image)}
                                className={`aspect-[4/3] rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${activeImage === tour.image ? 'border-electric-blue dark:border-emerald-500 ring-2 ring-electric-blue/30' : 'border-transparent hover:opacity-80'}`}
                            >
                                <img 
                                  src={tour.image} 
                                  alt="Main" 
                                  className="w-full h-full object-cover" 
                                  loading="lazy" 
                                  onError={(e) => { 
                                    e.currentTarget.parentElement!.style.display = 'none'; 
                                    handleImageError(tour.image);
                                  }}
                                />
                            </div>

                            {tour.gallery?.slice(0, 35).map((img, idx) => (
                               <div 
                                 key={idx}
                                 onClick={() => handleGalleryClick(img)}
                                 className={`relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer border-2 transition-all group ${activeImage === img ? 'border-electric-blue dark:border-emerald-500 ring-2 ring-electric-blue/30' : 'border-transparent'}`}
                               >
                                  <img 
                                    src={img} 
                                    alt={`Gallery ${idx}`} 
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    loading="lazy"
                                    onError={(e) => { 
                                      e.currentTarget.parentElement!.style.display = 'none'; 
                                      handleImageError(img);
                                    }}
                                  />
                               </div>
                            ))}
                         </div>
                    </div>
                 </div>
              </div>

              <div className="h-20"></div>

           </div>

            <div className="p-4 md:p-6 bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 z-30 sticky bottom-0">
                 <div className="bg-gradient-to-r from-deep-slate to-gray-900 dark:from-white dark:to-gray-200 rounded-2xl p-4 md:p-5 text-white dark:text-black shadow-2xl flex justify-between items-center transform transition-transform hover:scale-[1.01]">
                    <div>
                       <div className="text-gray-400 dark:text-gray-600 text-[10px] font-bold uppercase tracking-widest mb-1">Стоимость тура</div>
                       <div className="text-2xl md:text-3xl font-heading font-black leading-none tracking-tight">{tour.price}</div>
                    </div>
                    <button onClick={handleGeneralBooking} className="bg-white dark:bg-black text-black dark:text-white font-bold px-6 md:px-8 py-3.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors shadow-lg active:scale-95 text-xs md:text-sm uppercase tracking-widest flex items-center gap-2">
                       Записаться <ArrowRight className="w-4 h-4" />
                    </button>
                 </div>
            </div>

        </div>

      </div>

      {lightboxImage && (
        <div 
          className="fixed inset-0 z-[130] bg-black flex items-center justify-center animate-fade-in md:hidden touch-pan-y pointer-events-auto"
          onClick={() => { vibrate(10); setLightboxImage(null); }} 
          {...lightboxSwipeHandlers}
        >
          <button 
            className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full z-20 pointer-events-auto"
            onClick={(e) => { e.stopPropagation(); vibrate(10); setLightboxImage(null); }}
          >
            <X className="w-8 h-8" />
          </button>

          <button 
            onClick={(e) => { e.stopPropagation(); handleLightboxPrev(); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/30 text-white rounded-full z-20 pointer-events-auto"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button 
            onClick={(e) => { e.stopPropagation(); handleLightboxNext(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/30 text-white rounded-full z-20 pointer-events-auto"
          >
            <ArrowRight className="w-8 h-8" />
          </button>

          <img 
            src={lightboxImage} 
            alt="Fullscreen" 
            className="w-full h-full object-contain transition-opacity duration-300"
            onClick={(e) => e.stopPropagation()} 
          />
          
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/50 px-3 py-1 rounded-full text-white text-xs font-bold">
             {validGalleryImages.indexOf(lightboxImage) + 1} / {validGalleryImages.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default TourModal;
