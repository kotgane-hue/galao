
import React, { useState, Suspense, lazy, useRef, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
// Lazy loaded components
const GodSection = lazy(() => import('./components/GodSection'));
const ToursSection = lazy(() => import('./components/ToursSection'));
const TeamSection = lazy(() => import('./components/TeamSection'));
const GallerySection = lazy(() => import('./components/GallerySection'));
const VideoSection = lazy(() => import('./components/VideoSection'));
const ReviewsSection = lazy(() => import('./components/ReviewsSection'));

import Footer from './components/Footer';
import TourModal from './components/TourModal';
import RunningMascot from './components/RunningMascot';
import CalendarModal from './components/CalendarModal';
import ReviewModal from './components/ReviewModal';
import MobileStickyBar from './components/MobileStickyBar';
import ScrollProgress from './components/ScrollProgress';
import Preloader from './components/Preloader';
import NotFound from './components/NotFound';
import SEO from './components/SEO';
import FloatingManager from './components/FloatingManager';

import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Tour } from './types';

// Helper component to trigger load only when visible
const LazySection = ({ children }: { children?: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' } // Load 300px before appearing
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="min-h-[50vh]">
      {isVisible ? (
        <Suspense fallback={<div className="h-96 w-full flex items-center justify-center text-gray-400">Loading...</div>}>
          {children}
        </Suspense>
      ) : null}
    </div>
  );
};

const AppContent = () => {
  const [selectedTourId, setSelectedTourId] = useState<string | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const { tours } = useLanguage();

  // Simple 404 Check
  // In a real router, we'd use <Route path="*" />. 
  // Here we check if pathname is something other than / or /index.html
  const isNotFound = window.location.pathname !== '/' && window.location.pathname !== '/index.html';

  if (isNotFound) {
    return (
        <>
            <SEO title="Страница не найдена" />
            <NotFound />
        </>
    );
  }

  const selectedTourIndex = selectedTourId ? tours.findIndex(t => t.id === selectedTourId) : -1;
  const selectedTour = selectedTourIndex !== -1 ? tours[selectedTourIndex] : null;

  const handleOpenTour = (tour: Tour) => {
    setSelectedTourId(tour.id);
    // document.body.style.overflow = 'hidden'; // Removed to let TourModal handle robust scroll locking
    // Update URL hash without reload for shareability simulation
    window.history.pushState({}, '', `#tour-${tour.id}`);
  };

  const handleCloseTour = () => {
    setSelectedTourId(null);
    // document.body.style.overflow = 'auto'; // Removed to let TourModal handle cleanup
    window.history.pushState({}, '', window.location.pathname);
  };

  const handleNextTour = () => {
    if (selectedTourIndex !== -1) {
      const nextIndex = (selectedTourIndex + 1) % tours.length;
      const nextTour = tours[nextIndex];
      setSelectedTourId(nextTour.id);
      window.history.pushState({}, '', `#tour-${nextTour.id}`);
    }
  };

  const handlePrevTour = () => {
    if (selectedTourIndex !== -1) {
      const prevIndex = (selectedTourIndex - 1 + tours.length) % tours.length;
      const prevTour = tours[prevIndex];
      setSelectedTourId(prevTour.id);
      window.history.pushState({}, '', `#tour-${prevTour.id}`);
    }
  };

  const handleOpenCalendar = () => {
    setIsCalendarOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseCalendar = () => {
    setIsCalendarOpen(false);
    document.body.style.overflow = '';
  };

  const handleOpenReviewModal = () => {
    setIsReviewModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseReviewModal = () => {
    setIsReviewModalOpen(false);
    document.body.style.overflow = '';
  };

  // Check for hash on load to open tour
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#tour-')) {
        const tourId = hash.replace('#tour-', '');
        const tour = tours.find(t => t.id === tourId);
        if (tour) {
            setSelectedTourId(tour.id);
            // document.body.style.overflow = 'hidden'; // Let TourModal handle
        }
    }
  }, [tours]);

  return (
    <div className="min-h-screen font-sans transition-colors duration-300">
      <SEO /> {/* Default Homepage SEO */}
      <Preloader />
      <FloatingManager />
      <ScrollProgress />
      <Navbar />
      <main>
        {/* Hero loads immediately */}
        <Hero onOpenCalendar={handleOpenCalendar} />
        
        {/* Lazy load other sections on scroll */}
        {/* WRAPPED IN DIVS WITH IDs TO ENSURE NAVIGATION WORKS BEFORE LOAD */}
        
        <div id="about" className="scroll-mt-20">
            <LazySection>
              <GallerySection />
            </LazySection>
        </div>

        <LazySection>
          <GodSection />
        </LazySection>
        
        {/* Anchor for immediate scrolling */}
        <div id="tours" className="scroll-mt-20">
          <LazySection>
            <ToursSection 
              onOpenTour={handleOpenTour} 
              selectedTourId={selectedTourId} 
            />
          </LazySection>
        </div>
        
        <LazySection>
          <VideoSection />
        </LazySection>
        
        <div id="team" className="scroll-mt-20">
            <LazySection>
              <TeamSection />
            </LazySection>
        </div>

        {/* Reviews moved to bottom */}
        <div id="reviews" className="scroll-mt-20">
            <LazySection>
              <ReviewsSection onOpenReviewModal={handleOpenReviewModal} />
            </LazySection>
        </div>
      </main>
      <Footer />
      <RunningMascot />
      <MobileStickyBar onOpenCalendar={handleOpenCalendar} />
      
      {/* Global Modals */}
      {selectedTour && (
        <TourModal 
          tour={selectedTour} 
          onClose={handleCloseTour} 
          onNext={handleNextTour}
          onPrev={handlePrevTour}
        />
      )}

      {isCalendarOpen && (
        <CalendarModal onClose={handleCloseCalendar} onOpenTour={handleOpenTour} />
      )}

      {isReviewModalOpen && (
        <ReviewModal onClose={handleCloseReviewModal} />
      )}
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
