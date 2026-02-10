
import { useEffect } from 'react';

export const useScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    if (isLocked) {
      // Save current overflow style
      const originalStyle = window.getComputedStyle(document.body).overflow;
      const scrollBarWidth = window.innerWidth - document.body.clientWidth;
      
      // Prevent scrolling and layout shift
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollBarWidth}px`; // Prevent content jump

      return () => {
        document.body.style.overflow = originalStyle;
        document.body.style.paddingRight = '0px';
      };
    }
  }, [isLocked]);
};
