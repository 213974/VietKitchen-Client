import { motion, AnimatePresence } from 'framer-motion';
import { useScrollPosition } from '../../../hooks/useScrollPosition';
import './ScrollToTopButton.css';
import ArrowUpIcon from '../../../assets/icons/arrow-up.svg?react';

const ScrollToTopButton = () => {
  // --- FIX: Destructure the 'isScrolled' boolean from the returned object ---
  const { isScrolled } = useScrollPosition(500);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isScrolled && (
        <motion.button
          className="scroll-to-top-btn"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          aria-label="Scroll to top"
        >
          <ArrowUpIcon />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;