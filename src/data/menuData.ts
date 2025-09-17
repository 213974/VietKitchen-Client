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
// Export the comprehensive list of all menu posters
export const menuData: MenuPoster[] = [
  // Food Menus
  {
    imageSrc: pho,
    altText: "Pho Menu",
    category: 'Food',
    details: [
      {
        categoryTitle: 'Pho',
        items: [
          { name: "Pho Beef Combination", price: "$16.00", description: "Includes { Eye Round, Brisket, Flank, Meatball, Tendon }" },
          { name: "Pho Beef", price: "$13.00", description: "Protein Choice (2) Eye Round | Brisket | Flank | Tendon | Meatball" },
          { name: "Pho Shrimp", price: "$16.00" },
          { name: "Pho Vegetarian", price: "$13.00", description: "Includes { Broccoli, Carrot, Mushroom - Vegie Broth }" },
          { name: "Pho Chicken", price: "$13.00", description: "(White Meat - Chicken Broth)" },
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
    details: [
      {
        categoryTitle: 'Milk Tea',
        items: [
          { name: "Strawberry Matcha", price: "(S) $5.25 - (L) $6.25" },
          { name: "Crème Brule Milk Tea", price: "(S) $5.25 - (L) $6.25" },
          { name: "Taro Milk Tea", price: "(S) $5.25 - (L) $6.25" },
          { name: "Brown Sugar Latte", price: "(S) $5.25 - (L) $6.25" },
          { name: "Green Thai Milk Tea", price: "(S) $5.25 - (L) $6.25" },
          { name: "Brown Sugar Crème Brule", price: "(S) $5.25 - (L) $6.25" },
          { name: "Matcha Latte", price: "(S) $5.25 - (L) $6.25" },
          { name: "Classic Milk Tea", price: "(S) $5.25 - (L) $6.25" },
          { name: "Mango Matcha", price: "(S) $5.25 - (L) $6.25" },
          { name: "Chocolate Latte", price: "(S) $5.25 - (L) $6.25" },
          { name: "Thai Milk Tea", price: "(S) $5.25 - (L) $6.25" },
        ]
      }
    ]
  },
  {
    imageSrc: fruitTeaLemonades,
    altText: "Fruit Tea & Lemonades Menu",
    category: 'Drinks',
    details: [
      {
        categoryTitle: 'Fruit Tea & Lemonades',
        items: [
          { name: "Butterfly Sky-burst Lemonade", price: "$7.00" },
          { name: "Butterfly Pea Lemonade", price: "$7.00" },
          { name: "Fruit Tea", price: "$7.00" },
          { name: "Refreshing Fruity Soda", price: "$7.00" },
          { name: "Pineapple Peach Lemonade", price: "$7.00" },
        ]
      }
    ]
  },
  {
    imageSrc: smoothies,
    altText: "Smoothies Menu",
    category: 'Drinks',
    details: [
      {
        categoryTitle: 'Smoothies',
        items: [
          { name: "Thai Tea", price: "$7.00" },
          { name: "Cookies & Cream", price: "$7.00" },
          { name: "Tropical Mango", price: "$7.00" },
          { name: "Pina Colada", price: "$7.00" },
          { name: "Vanilla Yogurt", price: "$7.00" },
          { name: "Chocolate Strawberry", price: "$7.00" },
          { name: "Strawberry Kiwi", price: "$7.00" },
          { name: "Strawberry", price: "$7.00" },
          { name: "Banana", price: "$7.00" },
          { name: "Tropical Guava", price: "$7.00" },
          { name: "Passion Fruit Colada", price: "$7.00" },
          { name: "Strawberry Banana", price: "$7.00" },
        ]
      }
    ]
  },
  {
    imageSrc: coffee,
    altText: "Coffee Menu",
    category: 'Drinks',
    details: [
      {
        categoryTitle: 'Coffee',
        items: [
          { name: "Vietnamese Coffee", price: "$7.00" },
          { name: "Creamy Vietnamese Coffee", price: "$7.00" },
          { name: "Vietnamese Coffee Crème Brule", price: "$7.00" },
          { name: "Caramel Vietnamese Coffee", price: "$7.00" },
        ]
      }
    ]
  },
  // Desserts Menu
  {
    imageSrc: desserts,
    altText: "Desserts Menu",
    category: 'Desserts',
    details: [
      {
        categoryTitle: 'Desserts',
        items: [
          { name: "Chocolate Cake", price: "$5.50" },
          { name: "Mango Mousse", price: "$5.50" },
          { name: "Crème Brulee Cheese Cake", price: "$5.50" },
          { name: "Tiramisu", price: "$5.50" },
          { name: "Key Lime Pie", price: "$5.50" },
        ]
      }
    ]
  },
];