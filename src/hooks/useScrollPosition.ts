import { useState, useEffect } from 'react';

/**
 * A custom hook that tracks the vertical scroll position of the window.
 * It returns both a boolean for passing a threshold and the current scroll percentage.
 * @param threshold The scroll position (in pixels) to check against for the isScrolled boolean. Defaults to 100.
 * @returns An object containing `isScrolled` (boolean) and `scrollPercentage` (number from 0 to 1).
 */
export const useScrollPosition = (threshold = 100) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Handle the isScrolled boolean
      if (window.scrollY > threshold) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Handle the scroll percentage calculation
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const maxScroll = docHeight - windowHeight;
      
      // Avoid division by zero on pages that don't scroll
      if (maxScroll > 0) {
        setScrollPercentage(scrollY / maxScroll);
      } else {
        setScrollPercentage(0);
      }
    };

    // Add the event listener on component mount.
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount to get initial position
    handleScroll();

    // Cleanup function to remove the listener on component unmount.
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return { isScrolled, scrollPercentage };
};