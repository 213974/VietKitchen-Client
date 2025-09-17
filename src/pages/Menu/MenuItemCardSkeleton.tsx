import './MenuPage.css';

const MenuItemCardSkeleton = () => {
  return (
    <div className="menu-item-card skeleton-menu-item">
      <div className="skeleton-image"></div>
      <div className="skeleton-menu-info">
        <div className="skeleton-text skeleton-h3"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-text short"></div>
        <div className="skeleton-price"></div>
      </div>
    </div>
  );
};

export default MenuItemCardSkeleton;