import React, { useState, useCallback } from 'react';
import { Clock, Users, ArrowUpRight } from 'lucide-react';
import { Tour, TourCategory } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { vibrate } from '../utils/vibrate';

interface ToursSectionProps {
  onOpenTour: (tour: Tour) => void;
  selectedTourId: string | null;
}

// Optimized Card Component with React.memo
const TourCard = React.memo(({ tour, onClick, isSelected, priority }: { tour: Tour; onClick: () => void; isSelected: boolean; priority: boolean }) => {
  // Extract numeric price for Schema
  const numericPrice = tour.price.replace(/\D/g, '');

  return (
    <article 
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      // Use standard aspect ratio for mobile, specific height for desktop. 'isolate' creates new stacking context.
      className={`group relative aspect-[3/4] h-auto md:h-[550px] md:aspect-auto w-full rounded-[2rem] cursor-pointer bg-gray-900 isolate overflow-hidden select-none ${isSelected ? 'z-50' : 'z-0'}`}
      style={{
        borderRadius: '2rem'
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label={`View tour details for ${tour.title}`}
      itemScope
      itemType="https://schema.org/TouristTrip"
    >
      {/* Hidden Schema Meta Tags for Rich Snippets */}
      <meta itemProp="name" content={tour.title} />
      <meta itemProp="description" content={tour.shortDesc || tour.desc} />
      <meta itemProp="touristType" content={tour.difficulty} />
      <div itemProp="offers" itemScope itemType="https://schema.org/Offer" className="hidden">
         <meta itemProp="price" content={numericPrice} />
         <meta itemProp="priceCurrency" content="RUB" />
         <meta itemProp="availability" content="https://schema.org/InStock" />
         <meta itemProp="url" content={`https://galagon.ru/#tour-${tour.id}`} />
      </div>

      {/* Background Image - Scales on hover */}
      <img 
        src={tour.image} 
        alt={tour.title}
        itemProp="image"
        // Removed 'will-change-transform' to fix blinking on some devices
        // Added backfaceVisibility to prevent flickering
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out md:group-hover:scale-110"
        style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        loading={priority ? "eager" : "lazy"}
        decoding="auto" 
        width="400"
        height="550"
        draggable={false}
      />
      
      {/* Dark Overlay for Text Readability - Always present at bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90 pointer-events-none" />

      {/* Top Badges (Category & Arrow) */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-20 pointer-events-none">
         <span className={`px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest border border-white/10 shadow-sm
            ${tour.category === 'multi-day' ? 'bg-orange-500/40 border-orange-500/30' : ''}
         `}>
            {tour.category === 'multi-day' ? 'Multi-day' : 
             tour.category === 'jeep' ? 'Jeep' :
             tour.category === 'gastro' ? 'Gastro' :
             tour.category === 'excursion' ? 'Excursion' :
             tour.category === 'other' ? 'Other' : '1 Day'}
         </span>
         <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white text-black flex items-center justify-center transform md:rotate-45 md:group-hover:rotate-0 transition-transform duration-500 shadow-lg">
            <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
         </div>
      </div>

      {/* Bottom Content Container - Aligned to bottom */}
      <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-20 flex flex-col justify-end pointer-events-none">
         {/* Animated Wrapper: Moves up on hover to reveal description */}
         <div className="transition-all duration-500 ease-out md:translate-y-4 md:group-hover:translate-y-0">
            
            {/* Meta & Title Block */}
            <div className="mb-2 transition-all duration-500 md:group-hover:mb-2">
                <div className="flex items-center gap-3 text-white/70 text-xs font-bold uppercase tracking-widest mb-2">
                    <span itemProp="itinerary">{tour.location}</span>
                    <span className="w-1 h-1 rounded-full bg-white/50" />
                    <span className={`${tour.difficulty.includes('Hard') || tour.difficulty.includes('Extreme') ? 'text-red-400' : 'text-emerald-400'}`}>{tour.difficulty}</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-heading font-bold text-white leading-tight drop-shadow-md text-balance">
                    {tour.title}
                </h3>
            </div>

            {/* Description & Details - Hidden by default on Desktop, Reveals on Hover */}
            {/* Using grid-rows trick for smooth height animation from 0 to auto */}
            <div className="grid grid-rows-[0fr] md:group-rows-[0fr] md:group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                <div className="overflow-hidden">
                    <div className="pt-2 opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-100">
                         {tour.shortDesc && (
                            <p className="text-sm text-gray-200 line-clamp-3 leading-relaxed mb-4 hidden md:block">
                               {tour.shortDesc}
                            </p>
                         )}

                         <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4 hidden md:grid">
                             <div className="flex items-center gap-2 text-white/90">
                                <Clock className="w-4 h-4 text-emerald-400" />
                                <span className="text-sm font-medium">{tour.duration}</span>
                             </div>
                             <div className="flex items-center gap-2 text-white/90">
                                <Users className="w-4 h-4 text-emerald-400" />
                                <span className="text-sm font-medium">{tour.groupSizeInfo}</span>
                             </div>
                         </div>
                    </div>
                </div>
            </div>
            
            {/* Mobile Only: Simple Stats Row (Since no hover) */}
            <div className="md:hidden grid grid-cols-2 gap-4 border-t border-white/10 pt-4 mt-2">
                 <div className="flex items-center gap-2 text-white/90">
                    <Clock className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-medium">{tour.duration}</span>
                 </div>
                 <div className="flex items-center gap-2 text-white/90">
                    <Users className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-medium">{tour.groupSizeInfo}</span>
                 </div>
            </div>

         </div>
      </div>
    </article>
  );
});

const ToursSection: React.FC<ToursSectionProps> = ({ onOpenTour, selectedTourId }) => {
  const { tours, t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<'all' | TourCategory>('all');
  const [visibleCount, setVisibleCount] = useState(6);

  const filters: { id: 'all' | TourCategory; label: string }[] = [
    { id: 'all', label: t.tours.filters.all },
    { id: 'one-day', label: t.tours.filters.oneDay },
    { id: 'multi-day', label: t.tours.filters.multiDay },
    { id: 'jeep', label: t.tours.filters.jeep },
    { id: 'excursion', label: t.tours.filters.excursion },
    { id: 'gastro', label: t.tours.filters.gastro },
    { id: 'other', label: t.tours.filters.other },
  ];

  const filteredTours = activeFilter === 'all' 
    ? tours 
    : tours.filter(tour => tour.category === activeFilter);
  
  const handleFilterClick = useCallback((id: 'all' | TourCategory) => {
    vibrate(10);
    setActiveFilter(id);
    setVisibleCount(6);
  }, []);

  // Memoize the open tour handler
  const handleOpenTourWithVibration = useCallback((tour: Tour) => {
    vibrate(15);
    onOpenTour(tour);
  }, [onOpenTour]);

  const handleLoadMore = useCallback(() => {
    vibrate(10);
    setVisibleCount(filteredTours.length);
  }, [filteredTours.length]);

  return (
    <section className="py-24 md:py-32 bg-white dark:bg-black transition-colors duration-500 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header - Semantic change: div -> header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
             <span className="text-emerald-600 dark:text-emerald-400 font-bold tracking-[0.2em] uppercase text-xs mb-4 block select-none">
               {t.tours.directions}
             </span>
             <h2 className="text-5xl md:text-7xl font-heading font-black text-gray-900 dark:text-white leading-[0.9] tracking-tight text-balance select-none">
               {t.tours.title}
             </h2>
          </div>
          <div className="flex flex-col gap-4 items-end">
            <p className="text-gray-500 dark:text-gray-400 text-lg font-light max-w-sm text-balance text-left md:text-right select-none">
              {t.tours.subtitle}
            </p>
          </div>
        </header>

        {/* Filters - Scrollable & Touch Friendly */}
        {/* Removed touch-pan-y to enable native horizontal scrolling */}
        <nav className="flex overflow-x-auto pb-6 mb-8 hide-scrollbar -mx-6 px-6 md:mx-0 md:px-0 gap-3 md:flex-wrap snap-x snap-mandatory">
           {filters.map((filter) => (
             <button
               key={filter.id}
               onClick={() => handleFilterClick(filter.id)}
               className={`snap-start whitespace-nowrap px-6 h-12 rounded-full border text-xs font-bold uppercase tracking-widest transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 select-none min-h-[44px]
                  ${activeFilter === filter.id 
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white shadow-lg transform scale-105' 
                    : 'bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-800 hover-hover:hover:border-emerald-500 dark:hover-hover:hover:border-emerald-500'
                  }
               `}
               aria-pressed={activeFilter === filter.id}
             >
               {filter.label}
             </button>
           ))}
        </nav>

        {/* Grid - Removed 'animate-fade-in' to prevent re-rendering flash */}
        {filteredTours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6">
            {filteredTours.slice(0, visibleCount).map((tour, index) => (
              <TourCard 
                key={tour.id} 
                tour={tour} 
                isSelected={selectedTourId === tour.id}
                onClick={() => handleOpenTourWithVibration(tour)}
                priority={index < 4} // Eager load first 4 images
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-[2rem] select-none">
             <p className="text-gray-400 font-medium">{t.tours.notFound}</p>
             <button 
               onClick={() => handleFilterClick('all')}
               className="mt-4 text-emerald-500 font-bold uppercase text-xs tracking-widest hover:underline p-2 min-h-[44px]"
             >
               {t.tours.reset}
             </button>
          </div>
        )}

        {/* Load More */}
        {filteredTours.length > visibleCount && (
          <div className="mt-20 flex justify-center">
            <button 
              onClick={handleLoadMore}
              className="px-8 h-14 rounded-full border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white font-bold text-sm uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all select-none min-h-[44px]"
            >
              {t.tours.showAll}
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default ToursSection;