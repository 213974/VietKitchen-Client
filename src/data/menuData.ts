// Import all the new menu poster images
import coffee from '../assets/menu/Coffee.jpg';
import desserts from '../assets/menu/Desserts.jpeg';
import freshLite from '../assets/menu/Fresh_Lite.jpeg';
import fruitTeaLemonades from '../assets/menu/FruitTea_Lemonades.jpg';
import milkTea from '../assets/menu/MilkTea.jpg';
import pho from '../assets/menu/Pho.jpeg';
import riceNoodles from '../assets/menu/Rice_Noodles.jpeg';
import smallBites from '../assets/menu/SmallBites_Appetizers.jpeg';
import smoothies from '../assets/menu/Smoothies.jpg';
import vietEntrees from '../assets/menu/VietEntrees.jpeg';
import wingFries from '../assets/menu/Wing_Fries.jpeg';

// --- Strong Types for Menu Details ---
interface MenuItemDetail {
  name: string;
  price: string;
  description?: string;
}

interface MenuCategoryDetail {
  categoryTitle: string;
  items: MenuItemDetail[];
}

// --- Main Poster Structure ---
export interface MenuPoster {
  imageSrc: string;
  altText: string;
  category: 'Food' | 'Drinks' | 'Desserts';
  details: MenuCategoryDetail[]; // Use the new, strong type
}

// Export the comprehensive list of all menu posters
export const menuData: MenuPoster[] = [
  // Food Menus
  {
    imageSrc: pho,
    altText: "Pho Menu",
    category: 'Food',
    details: [
      {
        categoryTitle: 'Pho (Noodle Soup)',
        items: [
          { name: "P1. House Special (Dac Biet)", price: "$15.95" },
          { name: "P2. Rare Steak", price: "$14.95" },
          { name: "P3. Rare Steak & Brisket", price: "$14.95" },
          { name: "P4. Rare Steak & Meatball", price: "$14.95" },
          { name: "P5. Brisket & Meatball", price: "$14.95" },
          { name: "P6. Meatball", price: "$14.95" },
          { name: "P7. Chicken", price: "$14.95" },
          { name: "P8. Shrimp", price: "$15.95" },
          { name: "P9. Tofu & Veggies", price: "$14.95" },
        ]
      }
    ]
  },
  {
    imageSrc: riceNoodles,
    altText: "Rice & Noodles Menu",
    category: 'Food',
    details: []
  },
  {
    imageSrc: vietEntrees,
    altText: "Vietnamese Entrees Menu",
    category: 'Food',
    details: []
  },
  {
    imageSrc: smallBites,
    altText: "Small Bites & Appetizers Menu",
    category: 'Food',
    details: []
  },
  {
    imageSrc: wingFries,
    altText: "Wings & Fries Menu",
    category: 'Food',
    details: []
  },
  {
    imageSrc: freshLite,
    altText: "Fresh & Lite Options Menu",
    category: 'Food',
    details: []
  },
  // Drinks Menus
  {
    imageSrc: milkTea,
    altText: "Milk Tea Menu",
    category: 'Drinks',
    details: []
  },
  {
    imageSrc: fruitTeaLemonades,
    altText: "Fruit Tea & Lemonades Menu",
    category: 'Drinks',
    details: []
  },
  {
    imageSrc: smoothies,
    altText: "Smoothies Menu",
    category: 'Drinks',
    details: []
  },
  {
    imageSrc: coffee,
    altText: "Coffee Menu",
    category: 'Drinks',
    details: []
  },
  // Desserts Menu
  {
    imageSrc: desserts,
    altText: "Desserts Menu",
    category: 'Desserts',
    details: []
  },
];