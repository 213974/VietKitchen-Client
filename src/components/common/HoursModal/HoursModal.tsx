import { motion, type Variants } from 'framer-motion';
import './HoursModal.css';
import type { OpeningHour } from '../../../hooks/useStoreInfo';

interface HoursModalProps {
  hours: OpeningHour[];
  isLoading: boolean;
  isPreview?: boolean;
  isHomePage?: boolean; // New prop
}

const HoursModal = ({ hours, isLoading, isPreview = false, isHomePage = false }: HoursModalProps) => {
  const currentDayIndex = new Date().getDay();
  const highlightedDayIndex = currentDayIndex === 0 ? 6 : currentDayIndex - 1;

  const popoverVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 400, damping: 30 } },
    exit: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.15 } },
  };

  const content = (
    <>
      {isLoading ? (
        <div className="hours-loading">Loading...</div>
      ) : (
        <ul className="hours-list">
          {hours.map((item, index) => (
            <li key={item._id || item.day} className={index === highlightedDayIndex ? 'highlighted' : ''}>
              <span className="day">{item.day}</span>
              <span className="time">{item.time}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );

  const modalClasses = `hours-popover-content ${isPreview ? 'is-preview' : ''} ${isHomePage ? 'is-home' : ''}`;

  if (isPreview) {
    return (
      <div className={modalClasses}>
        {content}
      </div>
    );
  }

  return (
    <motion.div
      className={modalClasses}
      onClick={(e) => e.stopPropagation()}
      variants={popoverVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {content}
    </motion.div>
  );
};

export default HoursModal;