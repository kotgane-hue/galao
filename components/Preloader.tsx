
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mountain } from 'lucide-react';

const Preloader: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for content load + slight delay for smooth UX
    const handleLoad = () => setTimeout(() => setIsLoading(false), 2000);
    
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[99999] bg-gray-950 flex items-center justify-center flex-col gap-8"
        >
          {/* Logo Animation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
            className="relative"
          >
            <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full"></div>
            <Mountain className="w-20 h-20 text-white relative z-10" strokeWidth={1.5} />
          </motion.div>

          {/* Text */}
          <div className="flex flex-col items-center gap-4">
             <motion.h1 
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.2 }}
               className="text-3xl font-heading font-black text-white tracking-[0.2em]"
             >
                GALAGON
             </motion.h1>

             {/* Progress Bar */}
             <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-electric-blue to-emerald-500"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.8, ease: "easeInOut" }}
                />
             </div>
             
             <p className="text-gray-500 text-[10px] font-bold tracking-[0.3em] uppercase animate-pulse">
               Loading Adventure
             </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
