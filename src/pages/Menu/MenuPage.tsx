import { motion } from 'framer-motion';
import './MenuPage.css';
import SEO from '../../components/common/SEO/SEO';
import MenuPosterCard from './MenuPosterCard';

// Import the menu poster images
import snackBar from '../../assets/menu/SnackBar.avif';
import entree from '../../assets/menu/Entree.avif';
import entree2 from '../../assets/menu/Entree2.avif';
import latteCoffee from '../../assets/menu/Latte_Coffee.avif';
import teaFruityTea from '../../assets/menu/Tea_FruityTea.avif';
import shakesSmoothies from '../../assets/menu/Shakes_Smoothies.avif';
import wingZone from '../../assets/menu/WingZone.avif';
import extraMenuInfo from '../../assets/menu/ExtraMenuInfo.avif';

// --- Menu Details Data ---
// The `details` array now contains category objects.
const menuData = [
  {
    imageSrc: snackBar,
    altText: "Snack Bar Menu",
    details: []
  },
  {
    imageSrc: entree2,
    altText: "Entrees Menu Part 2",
    details: []
  },
  {
    imageSrc: entree,
    altText: "Entrees Menu Part 1",
    details: []
  },
  {
    imageSrc: latteCoffee,
    altText: "Latte & Coffee Menu",
    details: []
  },
  {
    imageSrc: teaFruityTea,
    altText: "Fruity Tea Menu",
    details: []
  },
  {
    imageSrc: shakesSmoothies,
    altText: "Shakes & Smoothies Menu",
    details: [
      {
        categoryTitle: 'Coladas',
        items: [
          { name: "Passion Colada", price: "$7.50" },
          { name: "Pina Colada", price: "$7.50" },
        ]
      },
      {
        categoryTitle: 'Shakes & Smoothies',
        items: [
          { name: "Strawberry Smoothie", price: "$7.50" },
          { name: "Mango Peach Smoothie", price: "$7.50" },
          { name: "Chocolate Strawberry", price: "$7.50" },
          { name: "Cookies & Cream", price: "$7.50" },
          { name: "Mango Smoothie", price: "$7.50" },
          { name: "Guava Tropical Smoothie", price: "$7.50" },
        ]
      },
      {
        categoryTitle: 'Hot',
        items: [
          { name: "Hot Choco Milo", price: "$6.00" },
          { name: "Ginger Honey Tea", price: "$5.00" },
        ]
      }
    ]
  },
  {
    imageSrc: wingZone,
    altText: "Wing Zone Menu",
    details: []
  },
  {
    imageSrc: extraMenuInfo,
    altText: "Extra Menu Information",
    details: []
  }
];

const MenuPage = () => {
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

        <motion.div 
          className="menu-posters-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {menuData.map((poster, index) => (
            <MenuPosterCard
              key={index}
              imageSrc={poster.imageSrc}
              altText={poster.altText}
              details={poster.details}
            />
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default MenuPage;