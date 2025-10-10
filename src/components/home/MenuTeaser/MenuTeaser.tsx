import { motion, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import './MenuTeaser.css';

// --- FIX: Correct way to import SVGs as components for Create React App ---
import { ReactComponent as NoodleBowlIcon } from '../../../assets/icons/noodle-bowl.svg';
import { ReactComponent as RiceBowlIcon } from '../../../assets/icons/rice-bowl.svg';
import { ReactComponent as TeaIcon } from '../../../assets/icons/tea.svg';
import { ReactComponent as SmoothieIcon } from '../../../assets/icons/smoothie.svg';

const signatureItems = [
  { name: 'Pho Beef Combination', icon: NoodleBowlIcon },
  { name: 'Banh Mi Cheese Steak', icon: RiceBowlIcon },
  { name: 'Fresh Summer Rolls', icon: RiceBowlIcon },
  { name: 'Brown Sugar Crème Brule', icon: TeaIcon },
  { name: 'Butterfly Sky-burst Lemonade', icon: SmoothieIcon }
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
        
        <motion.div className="signature-items-list" variants={childVariants}>
          {signatureItems.map((item) => {
            const IconComponent = item.icon;
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