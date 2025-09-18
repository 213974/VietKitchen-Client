import { motion, AnimatePresence } from 'framer-motion';
import './CookieSettingsTrigger.css';
import CookieIcon from '../../../assets/icons/cookie-settings.svg?react';
import { useMouseProximity } from '../../../hooks/useMouseProximity';
import { useScrollPosition } from '../../../hooks/useScrollPosition';
import { useResponsive } from '../../../hooks/useResponsive'; // Import the correct hook

interface CookieSettingsTriggerProps {
  onClick: () => void;
  isHidden: boolean;
}

const CookieSettingsTrigger = ({ onClick, isHidden }: CookieSettingsTriggerProps) => {
  // --- Hooks for determining visibility ---
  const { isDesktop } = useResponsive();
  const isMouseClose = useMouseProximity({ threshold: 550 });
  const { scrollPercentage } = useScrollPosition();

  let shouldBeVisible = false;

  // Ensure the button is never visible if the main cookie banner is already showing.
  if (!isHidden) {
    if (isDesktop) {
      // On desktop-sized screens, visibility is based purely on mouse proximity.
      shouldBeVisible = isMouseClose;
    } else {
      // On tablet and mobile screens, visibility is based on scrolling near the bottom.
      shouldBeVisible = scrollPercentage > 0.8;
    }
  }

  return (
    <AnimatePresence>
      {shouldBeVisible && (
        <motion.button
          className="cookie-settings-fab"
          onClick={onClick}
          aria-label="Open Cookie Settings"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          <CookieIcon />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default CookieSettingsTrigger;