import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Star, MessageSquarePlus } from 'lucide-react';

interface ReviewsSectionProps {
  onOpenReviewModal?: () => void;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ onOpenReviewModal }) => {
  const { reviews, t } = useLanguage();

  return (
    <section className="py-20 md:py-24 bg-light-bg dark:bg-gray-950 overflow-hidden relative transition-colors duration-500">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <header className="text-center mb-12 md:mb-16 animate-fade-in-up">
          <span className="text-electric-blue dark:text-emerald-400 font-bold tracking-[0.2em] uppercase text-xs bg-electric-blue/5 dark:bg-emerald-500/5 border border-electric-blue/30 dark:border-emerald-500/30 px-5 py-2 rounded-full inline-block mb-6 shadow-sm">
            {t.reviewsSection.trust}
          </span>
          <div className="mb-6">
            <h2 className="text-4xl md:text-6xl font-heading font-black text-deep-slate dark:text-white leading-none">
               {t.reviewsSection.title}
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-light leading-relaxed mb-8 text-balance">
            {t.reviewsSection.subtitle}
          </p>
          
          {onOpenReviewModal && (
            <button 
              onClick={onOpenReviewModal}
              className="inline-flex items-center gap-2 px-8 py-3 bg-white dark:bg-gray-800 hover-hover:hover:bg-gray-50 dark:hover-hover:hover:bg-gray-700 text-deep-slate dark:text-white font-bold rounded-xl border border-gray-200 dark:border-gray-700 hover-hover:hover:border-electric-blue/50 dark:hover-hover:hover:border-emerald-500/50 transition-all shadow-lg min-h-[48px]"
            >
              <MessageSquarePlus className="w-5 h-5 text-electric-blue dark:text-emerald-500" />
              {t.reviewsSection.leaveReview}
            </button>
          )}
        </header>

        {/* NATIVE SCROLL SNAP CONTAINER (Mobile Optimized) */}
        {/* Removed touch-pan-y to enable native horizontal scrolling */}
        <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory hide-scrollbar md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:pb-0">
           {reviews.map((review, idx) => (
              <div 
                key={idx} 
                className="min-w-[85vw] md:min-w-0 snap-center relative rounded-[2.5rem] p-[1px] bg-gradient-to-b from-gray-200 via-white to-gray-200 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 shadow-lg h-full select-none overflow-hidden"
              >
                  <article className="bg-white dark:bg-gray-900 p-8 rounded-[2.4rem] h-full flex flex-col relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-full overflow-hidden border border-gray-100 dark:border-gray-700 shrink-0">
                            <img 
                              src={review.avatar} 
                              alt={review.author} 
                              loading="lazy" 
                              decoding="async" 
                              className="w-full h-full object-cover grayscale opacity-90" 
                            />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg text-gray-900 dark:text-white">{review.author}</h4>
                            <span className="text-sm text-gray-500 font-medium">{review.date}</span>
                        </div>
                    </div>

                    <p className="text-lg text-gray-600 dark:text-gray-300 italic flex-grow leading-relaxed">
                        «{review.text}»
                    </p>

                    <div className="mt-6 flex text-yellow-400 gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-5 h-5 ${i < review.rating ? 'fill-current' : 'text-gray-200 dark:text-gray-800'}`} />
                        ))}
                    </div>
                  </article>
              </div>
           ))}
        </div>

      </div>
    </section>
  );
};

export default ReviewsSection;