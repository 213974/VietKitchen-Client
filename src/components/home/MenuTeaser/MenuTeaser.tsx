import { motion, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import './MenuTeaser.css';

// --- Step 1: Import the SVG icons as React components ---
import NoodleBowlIcon from '../../../assets/icons/noodle-bowl.svg?react';
import RiceBowlIcon from '../../../assets/icons/rice-bowl.svg?react';
import TeaIcon from '../../../assets/icons/tea.svg?react';
import SmoothieIcon from '../../../assets/icons/smoothie.svg?react';
// Note: We don't need the coffee icon for this specific list, but it's available.

// --- Step 2: Update signatureItems to an array of objects with names and icons ---
const signatureItems = [
  { name: 'Pho Beef Combination', icon: NoodleBowlIcon },
  { name: 'Banh Mi Cheese Steak', icon: RiceBowlIcon }, // Using rice-bowl as a general food icon
  { name: 'Fresh Summer Rolls', icon: RiceBowlIcon }, // Using rice-bowl as a general food icon
  { name: 'Brown Sugar Crème Brule', icon: TeaIcon },
  { name: 'Butterfly Sky-burst Lemonade', icon: SmoothieIcon } // Using smoothie as a general drink icon
];

const MenuTeaser = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, ease: 'easeOut' },
    },
  };

  const childVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="menu-teaser-section">
      <motion.div
        className="teaser-container frosted-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2 variants={childVariants}>A Taste of Tradition</motion.h2>
        <motion.p variants={childVariants}>
          Every dish is a celebration of authentic flavors, crafted with the freshest ingredients and a passion for community.
        </motion.p>
        
        {/* --- Step 3: Update the map function to render the icon and name --- */}
        <motion.div className="signature-items-list" variants={childVariants}>
          {signatureItems.map((item) => {
            const IconComponent = item.icon; // Assign to a capitalized variable to use as a component
            return (
              <div key={item.name} className="signature-item">
                <IconComponent className="signature-item-icon" />
                <span>{item.name}</span>
              </div>
            );
          })}
        </motion.div>

        <motion.div variants={childVariants}>
          <Link to="/menu" className="hero-button">Explore The Full Menu</Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default MenuTeaser;