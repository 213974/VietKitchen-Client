import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItemDetail {
  name: string;
  price: string;
  description?: string;
}

// The shape of the details prop is now more structured.
interface MenuCategoryDetail {
  categoryTitle: string;
  items: MenuItemDetail[];
}

interface MenuPosterCardProps {
  imageSrc: string;
  altText: string;
  details: MenuCategoryDetail[]; // Use the new, structured type.
}

const MenuPosterCard = ({ imageSrc, altText, details }: MenuPosterCardProps) => {
  const [isOverlayVisible, setOverlayVisible] = useState(false);

  const isInteractive = details.length > 0;

  return (
    <motion.div
      className={`menu-poster-card ${isInteractive ? 'interactive' : ''}`}
      onClick={() => isInteractive && setOverlayVisible(!isOverlayVisible)}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
      }}
    >
      <img src={imageSrc} alt={altText} loading="lazy" />
      <AnimatePresence>
        {isOverlayVisible && (
          <motion.div
            className="poster-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="poster-details-wrapper">
              {/* Map over the categories first */}
              {details.map(category => (
                <div key={category.categoryTitle} className="poster-category">
                  <h3 className="poster-category-title">{category.categoryTitle}</h3>
                  <div className="poster-details-grid">
                    {/* Then map over the items within each category */}
                    {category.items.map(item => (
                      <div key={item.name} className="poster-item-detail">
                        <span className="item-name">{item.name}</span>
                        <span className="item-price">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MenuPosterCard;