import { motion, type Variants } from 'framer-motion'; // Import the 'Variants' type
import { Link } from 'react-router-dom';
import './MenuTeaser.css';

// A static array of signature items to showcase.
const signatureItems = [
  'Classic Pho',
  'Taro Milk Tea',
  'Crispy Spring Rolls',
  'Banh Mi',
  'Vietnamese Coffee'
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
          {signatureItems.map((item) => (
            <div key={item} className="signature-item">
              {item}
            </div>
          ))}
        </motion.div>

        <motion.div variants={childVariants}>
          <Link to="/menu" className="hero-button">Explore The Full Menu</Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default MenuTeaser;