import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to the top of the page on every route change
    window.scrollTo(0, 0);
  }, [pathname]);

  // This component does not render anything to the DOM
  return null;
};

export default ScrollToTop;