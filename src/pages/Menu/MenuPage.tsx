import { useState, useMemo, Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './MenuPage.css';
import SEO from '../../components/common/SEO/SEO';
import MenuPosterCard from './MenuPosterCard';
// CORRECTED: Split into a value import and a type-only import
import { menuData } from '../../data/menuData';
import type { MenuPoster } from '../../data/menuData';

type MenuFilter = 'All' | 'Food' | 'Drinks' | 'Desserts';
const filterCategories: MenuFilter[] = ['All', 'Food', 'Drinks', 'Desserts'];

const MenuPage = () => {
  const [activeFilter, setActiveFilter] = useState<MenuFilter>('All');

  // useMemo will prevent re-calculating the filtered lists on every render
  const filteredMenu = useMemo(() => {
    if (activeFilter === 'All') {
      return menuData;
    }
    return menuData.filter(poster => poster.category === activeFilter);
  }, [activeFilter]);

  // Create a grouped structure for rendering the "All" view with headers
  const groupedMenu = useMemo(() => {
    return menuData.reduce((acc, poster) => {
      const category = poster.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(poster);
      return acc;
    }, {} as Record<MenuFilter, MenuPoster[]>);
  }, []);
  
  const onlineOrderUrl = 'https://online.skytab.com/38bdc873ed00c1a08c9bb35ce20ee7be';

  return (
    <>
      <SEO
        title="Menu"
        description="Explore the delicious menu at Viet Kitchen & Tea House. From authentic entrees to refreshing bubble teas, find your next favorite dish."
      />
      <div className="menu-page-container">
        <header className="menu-header">
          <h1>Our Menu</h1>
          <p>Authentic flavors crafted with the freshest ingredients.</p>
        </header>

        {/* --- NEW: Full Menu Notice --- */}
        <div className="full-menu-notice">
          <p>
            Browse our curated selections below. For our complete menu and to place an order, please visit our online ordering portal.
            <a href={onlineOrderUrl} target="_blank" rel="noopener noreferrer" className="notice-link-btn">
              View Full Menu & Order
            </a>
          </p>
        </div>

        <div className="menu-filters">
          {filterCategories.map(filter => (
            <button
              key={filter}
              className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <motion.div 
          className="menu-posters-grid"
        >
          <AnimatePresence mode="wait">
            {activeFilter === 'All' ? (
              // Render with category headers
              Object.entries(groupedMenu).map(([category, posters]) => (
                <Fragment key={category}>
                  <h2 className="menu-category-header">{category}</h2>
                  {posters.map((poster) => (
                    <MenuPosterCard
                      key={poster.altText}
                      imageSrc={poster.imageSrc}
                      altText={poster.altText}
                      details={poster.details}
                    />
                  ))}
                </Fragment>
              ))
            ) : (
              // Render the filtered list directly
              filteredMenu.map((poster) => (
                <MenuPosterCard
                  key={poster.altText}
                  imageSrc={poster.imageSrc}
                  altText={poster.altText}
                  details={poster.details}
                />
              ))
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
};

export default MenuPage;