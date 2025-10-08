import { motion } from 'framer-motion';

interface MenuItemDetail {
  name: string;
  price: string;
  description?: string;
}

interface MenuCategoryDetail {
  categoryTitle: string;
  items: MenuItemDetail[];
}

interface MenuDetailCardProps {
  altText: string;
  details: MenuCategoryDetail[];
}

const MenuDetailCard = ({ altText, details }: MenuDetailCardProps) => {
  return (
    <motion.div
      className="menu-detail-card"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <h3 className="detail-card-title">{altText}</h3>
      <div className="detail-card-content">
        {details.map(category => (
          <div key={category.categoryTitle} className="detail-category">
            <h4 className="detail-category-title">{category.categoryTitle}</h4>
            <div className="detail-items-list">
              {category.items.map(item => (
                <div key={item.name} className="detail-item">
                  <div className="detail-item-header">
                    <span className="detail-item-name">{item.name}</span>
                    <span className="detail-item-price">{item.price}</span>
                  </div>
                  {item.description && (
                    <p className="detail-item-description">{item.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default MenuDetailCard;