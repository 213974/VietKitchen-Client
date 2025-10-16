// src/components/home/WeeklySpecial/WeeklySpecial.tsx
import { motion } from 'framer-motion';
import { weeklySpecialsData, type WeeklySpecial } from '../../../data/weeklySpecials';
import './WeeklySpecial.css';

const WeeklySpecialDisplay = () => {
  // Get the current day's name to apply a highlight style.
  const currentDayName = new Date().toLocaleString('en-US', { weekday: 'long' }) as WeeklySpecial['day'];
  const hasAnyBogo = weeklySpecialsData.some(day => day.specials.some(item => item.price.toUpperCase() === 'BOGO'));

  return (
    <motion.div 
      className="weekly-special-container"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <h2 className="special-title">WEEKLY SPECIALS</h2>
      
      <div className="all-specials-list">
        {weeklySpecialsData.map((daySpecial) => (
          <div 
            key={daySpecial.day} 
            className={`special-day-card ${daySpecial.day === currentDayName ? 'is-today' : ''}`}
          >
            <h3 className="day-name">{daySpecial.day}</h3>
            <div className="day-items-list">
              {daySpecial.specials.map((item, index) => (
                // --- FIX: Restructured JSX for proper grouping and styling ---
                <div className="day-item" key={index}>
                  <div className="day-item-main">
                    <span className="day-item-price">{item.price}</span>
                    <span className="day-item-name">{item.name}</span>
                  </div>
                  {item.description && (
                    <span className="day-item-description">{item.description}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="special-footer-notes">
        {hasAnyBogo && (
          <p className="bogo-note">*BOGO = Buy One Get One Free</p>
        )}
        <p className="special-disclaimer">
          Weekly specials are valid for in-store or phone orders only.
        </p>
      </div>
    </motion.div>
  );
};

export default WeeklySpecialDisplay;