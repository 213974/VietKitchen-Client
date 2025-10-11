import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type Promotion } from '../../../hooks/usePromotions';
import './NotificationBanner.css';

// --- Asset Imports ---
import { ReactComponent as MegaphoneIcon } from '../../../assets/icons/megaphone.svg';
import { ReactComponent as CloseIcon } from '../../../assets/icons/close.svg';

// --- Component Interface ---
interface NotificationBannerProps {
  banner: Promotion;
  isVisible: boolean;
  onDismiss: () => void;
}

const NotificationBanner = ({ banner, isVisible, onDismiss }: NotificationBannerProps) => {
  // --- Auto-Dismiss Logic ---
  const handleDismiss = useCallback(() => {
    onDismiss();
  }, [onDismiss]);

  useEffect(() => {
    if (isVisible && banner.duration_seconds) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, banner.duration_seconds * 1000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, banner.duration_seconds, handleDismiss]);

  // --- Render Method ---
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="notification-banner"
          initial={{ y: '-100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          role="alert"
        >
          {/* --- Banner Content --- */}
          <div className="notification-content">
            <MegaphoneIcon className="notification-icon" />
            <p><strong>{banner.title}</strong> {banner.content}</p>
          </div>

          {/* --- Close Button (only for session-based banners) --- */}
          {banner.persistence_type === 'SESSION' && (
            <button className="notification-close-btn" onClick={handleDismiss} aria-label="Dismiss notification">
              <CloseIcon />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationBanner;