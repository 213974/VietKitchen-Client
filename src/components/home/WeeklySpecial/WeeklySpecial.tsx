import { motion } from 'framer-motion';
import { weeklySpecialsData, type WeeklySpecial } from '../../../data/weeklySpecials';
import './WeeklySpecial.css';

const WeeklySpecialDisplay = () => {
  const today = new Date();
  /* const currentMonth = today.toLocaleString('en-US', { month: 'long' }).toUpperCase(); */
  const currentDayName = today.toLocaleString('en-US', { weekday: 'long' }) as WeeklySpecial['day'];
  const todaysSpecial = weeklySpecialsData.find(special => special.day === currentDayName);
  const hasBogo = todaysSpecial?.specials.some(item => item.price.toUpperCase() === 'BOGO');

  return (
    <motion.div 
      className="weekly-special-container"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <h2 className="special-title">WEEKLY SPECIAL</h2>
      
      {todaysSpecial ? (
        <>
          <h3 className="special-day-title">{currentDayName}</h3>
          <div className="todays-special-list">
            {todaysSpecial.specials.map((item, index) => (
              <div className="special-item" key={index}>
                <span className="item-price">{item.price}</span>
                <span className="item-name">{item.name}</span>
              </div>
            ))}
          </div>
          {hasBogo && (
            <p className="bogo-note">*BOGO = Buy One Get One Free</p>
          )}
        </>
      ) : (
        <p className="no-special-message">Check back soon for today's special!</p>
      )}
    </motion.div>
  );
};

export default WeeklySpecialDisplay;