import { useState, useEffect } from 'react';

// Define the breakpoints for different screen sizes.
const MOBILE_BREAKPOINT = 500;
const TABLET_BREAKPOINT = 900;

// Defines the shape of the state object returned by the hook.
interface ResponsiveState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

/**
 * A custom hook that tracks the browser window's width and provides responsive state booleans.
 * This is useful for conditionally rendering components or applying styles based on screen size.
 * @returns An object with booleans `isMobile`, `isTablet`, and `isDesktop`.
 */
export const useResponsive = (): ResponsiveState => {
  // Helper function to get the current responsive state based on window width.
  const getResponsiveState = (): ResponsiveState => {
    const width = window.innerWidth;
    return {
      isMobile: width <= MOBILE_BREAKPOINT,
      isTablet: width > MOBILE_BREAKPOINT && width <= TABLET_BREAKPOINT,
      isDesktop: width > TABLET_BREAKPOINT,
    };
  };
  
  // Initialize the state with the current window size.
  const [state, setState] = useState<ResponsiveState>(getResponsiveState());

  useEffect(() => {
    // Event handler for the window's resize event.
    const handleResize = () => {
      setState(getResponsiveState());
    };

    // Add the event listener when the component mounts.
    window.addEventListener('resize', handleResize);
    // Cleanup function to remove the listener when the component unmounts.
    return () => window.removeEventListener('resize', handleResize);
  }, []); // The empty dependency array ensures this effect runs only once on mount.

  return state;
};