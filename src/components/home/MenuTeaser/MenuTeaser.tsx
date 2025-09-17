import { motion, type Variants } from 'framer-motion';
import { useMenuItems } from '../../../hooks/useMenuItems';
import { Link } from 'react-router-dom';
import './MenuTeaser.css';
import { useResponsive } from '../../../hooks/useResponsive';

/**
 * A component for the homepage that displays a small selection of featured menu items.
 * It fetches menu data and links to the full menu page.
 */
const MenuTeaser = () => {
  // ------------------- Hooks -------------------
  // Fetches menu items (currently mock data).
  const { menuItems, isLoading } = useMenuItems();
  // Determines if the viewport is desktop for animation adjustments.
  const { isDesktop } = useResponsive();

  // Filter the full menu list to get only the items marked as 'isFeatured'.
  const featuredItems = menuItems.filter(item => item.isFeatured);

  // ------------------- Animation Variants -------------------
  // A reusable variant for individual elements to fade and slide in from the bottom.
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  // A container variant used to orchestrate a staggered animation for its children.
  const gridVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Each child will animate in 0.1s after the previous one.
      },
    },
  };
  
  // ------------------- Render Method -------------------
  return (
    <section className="menu-teaser-section">
      <div className="teaser-container">
        {/* --- Header Section --- */}
        <motion.div 
          className="teaser-header"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible" // Animation triggers when the element enters the viewport.
          viewport={{ once: true, amount: 0.8 }}
        >
          <h2>Our Most Loved Dishes</h2>
          <p>A taste of what makes us special, crafted with passion.</p>
        </motion.div>
        
        {/* --- Featured Items Grid --- */}
        <div className="teaser-items-grid-wrapper">
          {/* Only render the grid if data has loaded and there are featured items. */}
          {!isLoading && featuredItems.length > 0 && (
            <motion.div 
              className="teaser-items-grid"
              variants={gridVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: isDesktop ? 0.3 : 0.1 }}
            >
              {featuredItems.map((item) => (
                <motion.div
                  key={item._id}
                  className="teaser-item-card"
                  variants={itemVariants} // Each card uses the item animation variant.
                >
                  <div className="teaser-item-image">
                    <img src={item.imageUrl} alt={item.name} />
                  </div>
                  <h3>{item.name}</h3>
                  <span className="teaser-item-price">${item.price.toFixed(2)}</span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* --- Call to Action Button --- */}
        <motion.div 
          className="teaser-button-container"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 1 }}
        >
          <Link to="/menu" className="hero-button">View Full Menu</Link>
        </motion.div>
      </div>
    </section>
  );
};

export default MenuTeaser;