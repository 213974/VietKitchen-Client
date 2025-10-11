import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Promotion } from '../../../hooks/usePromotions';
import './NotificationBanner.css';

// ------------------- Asset Imports -------------------
import { ReactComponent as MegaphoneIcon } from '../../../assets/icons/megaphone.svg';
import { ReactComponent as CloseIcon } from '../../../assets/icons/close.svg';

// ------------------- Component Interface -------------------
interface NotificationBannerProps {
  banner: Promotion;
}

const NotificationBanner = ({ banner }: NotificationBannerProps) => {
  // ------------------- State Management -------------------
  const [isVisible, setIsVisible] = useState(false);
  const storageKey = `dismissed_banner_${banner.id}`;

  // ------------------- Handlers -------------------
  const handleClose = useCallback(() => {
    setIsVisible(false);
    if (banner.persistence_type === 'SESSION') {
      sessionStorage.setItem(storageKey, 'true');
    }
  }, [banner.persistence_type, storageKey]);

  // ------------------- Effects -------------------
  // Effect to determine initial visibility based on persistence type.
  useEffect(() => {
    if (banner.persistence_type === 'SESSION') {
      const isDismissed = sessionStorage.getItem(storageKey);
      if (!isDismissed) {
        setIsVisible(true);
      }
    } else {
      // For 'PERMANENT' banners, always show them.
      setIsVisible(true);
    }
  }, [banner.persistence_type, storageKey]);

  // Effect to handle auto-dismissal after a set duration.
  useEffect(() => {
    if (isVisible && banner.duration_seconds) {
      const timer = setTimeout(() => {
        handleClose();
      }, banner.duration_seconds * 1000);
      
      // Cleanup function to clear the timer if the component unmounts or visibility changes.
      return () => clearTimeout(timer);
    }
  }, [isVisible, banner.duration_seconds, handleClose]);

  // ------------------- Render Method -------------------
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="notification-banner"
          initial={{ y: '-100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          role="alert"
        >
          {/* --- Banner Content --- */}
          <div className="notification-content">
            <MegaphoneIcon className="notification-icon" />
            <p>
              <strong>{banner.title}</strong> {banner.content}
            </p>
          </div>

          {/* --- Close Button (only for session-based banners) --- */}
          {banner.persistence_type === 'SESSION' && (
            <button className="notification-close-btn" onClick={handleClose} aria-label="Dismiss notification">
              <CloseIcon />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationBanner;