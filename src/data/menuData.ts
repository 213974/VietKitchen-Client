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
    details: [
        {
            categoryTitle: 'Rice & Noodles',
            items: [
                { name: "Rice with Grilled Meat", price: "$14.00", description: "Protein Choice (1): Pork | Beef | Chicken | Fried Tofu | +$4 Combination | +$3 Shrimp" },
                { name: "Fried Rice with Grilled Meat", price: "$16.00", description: "Protein Choice (1): Pork | Beef | Chicken | Fried Tofu | +$4 Combination | +$3 Shrimp" },
                { name: "Pineapple Fried Rice", price: "$18.00", description: "Protein Choice (1): Pork | Beef | Chicken | Fried Tofu | +$4 Combination | +$3 Shrimp" },
                { name: "Curry Fried Rice", price: "$16.00", description: "Protein Choice (1): Pork | Beef | Chicken | Fried Tofu | +$4 Combination | +$3 Shrimp" },
                { name: "Vermicelli Noodle with Grilled Meat", price: "$14.00", description: "Protein Choice (1): Pork | Beef | Chicken | Fried Tofu | +$3 Shrimp" },
                { name: "Vermicelli Noodle Combination", price: "$18.00", description: "Chicken, Beef, Pork & Shrimp" },
            ]
        }
    ]
  },
  {
    imageSrc: vietEntrees,
    altText: "Vietnamese Entrees Menu",
    category: 'Food',
    details: [
        {
            categoryTitle: 'Viet Entrees',
            items: [
                { name: "Garlic Noodle with Shrimp", price: "$18.00", description: "Protein Choice: +$7 Crab" },
                { name: "Garlic Noodle with Grilled Meat", price: "$15.00", description: "Protein Choice (1): Pork | Beef | Chicken | Fried Tofu | +$2 Combination" },
                { name: "Butter Glazed Salmon", price: "$22.00", description: "Served with Steamed Vegetables" },
                { name: "Pad Thai with Grilled Meat", price: "$15.00", description: "Protein Choice (1): Pork | Beef | Chicken | Fried Tofu | +$2 Combination" },
                { name: "Pad Thai with Shrimp", price: "$18.00" },
            ]
        }
    ]
  },
  {
    imageSrc: smallBites,
    altText: "Small Bites & Appetizers Menu",
    category: 'Food',
    details: [
        {
            categoryTitle: 'Small Bites & Appetizers',
            items: [
                { name: "Steamed Shrimp Hacao", price: "$6 - 4pcs / $8 - 6pcs" },
                { name: "Mango Bowl", price: "$6.00" },
                { name: "Steamed Shumai", price: "$6 - 4pcs / $8 - 6pcs", description: "(Contains Chicken, Pork & Shrimp)" },
                { name: "Crispy Spring Rolls", price: "$6 - 4pcs / $8 - 8pcs", description: "(Contains Shrimp & Pork - Vegetable Option Available)" },
                { name: "Crispy Musubi", price: "$8 - 2pcs / $10 - 3pcs" },
                { name: "Fresh Summer Rolls", price: "$7 - 2pcs / $10 - 3pcs", description: "Protein Choice (1): Shrimp | Grilled Pork | Chicken | Tofu" },
                { name: "Avocado Rolls", price: "$7 - 2pcs / $10 - 3pcs" },
                { name: "Steamed Buns", price: "$8 - 2pcs / $10 - 3pcs", description: "Protein Choice (1): Pork Belly | Chicken" },
                { name: "Coconut Shrimp", price: "$8 - 3pcs / $10 - 4pcs" },
                { name: "Pineapple & Pork Skewers", price: "$8 - 3pcs / $10 - 4pcs" },
                { name: "Crispy Shrimp & Chicken Wonton", price: "$8 - 3pcs / $10 - 4pcs" },
                { name: "Chicken Skewers", price: "$8 - 3pcs / $10 - 4pcs" },
            ]
        }
    ]
  },
  {
    imageSrc: wingFries,
    altText: "Wings & Fries Menu",
    category: 'Food',
    details: [
        {
            categoryTitle: 'Wing & Fries Zone',
            items: [
                { name: "Chicken Wings", price: "$11 - 6pcs / $15 - 10pcs", description: "Sauce Flavors (Up to 2): Viet Mamba | Garlic Honey Soy | Mango Habanero | Sweet & Sour | Salt & Pepper | Buffalo" },
                { name: "Parmesan Fries", price: "$6.00" },
                { name: "French Fries", price: "$4.00" },
                { name: "Viet Fries", price: "$10.00", description: "Protein Choice (1): Pork | Beef | Chicken" },
            ]
        }
    ]
  },
  {
    imageSrc: freshLite,
    altText: "Banh Mi - Fresh & Lite Menu",
    category: 'Food',
    details: [
        {
            categoryTitle: 'Banh Mi - Fresh & Lite',
            items: [
                { name: "Banh Mi with Grilled Meat", price: "$10.00", description: "Protein Choice (1): Pork | Beef | Chicken | Fried Tofu" },
                { name: "Banh Mi with Grilled Shrimp", price: "$13.00" },
                { name: "Banh Mi Cheese Steak", price: "$12.00" },
                { name: "Mango Salad", price: "$10.00" },
                { name: "Steamed Vegetables with Grilled Meat", price: "$12.00", description: "Protein Choice (1): Pork | Beef | Chicken | Fried Tofu | +$3 Shrimp" },
            ]
        }
    ]
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