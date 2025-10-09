// src/data/menuData.ts

// --- STEP 1: Import all the new menu poster images ---
import appetizersMenu from '../assets/menu/Appetizers_Menu.png';
import banhMiMenu from '../assets/menu/Banh_Mi_Menu.png';
import coffeeMenu from '../assets/menu/Coffee_Menu.png';
import dessertMenu from '../assets/menu/Dessert_Menu.png';
import fruitTeaMenu from '../assets/menu/Fruit_Tea_Lemonade_Menu.png';
/* import matchaMenu from '../assets/menu/Matcha_Special_Menu.png'; */
import milkTeaMenu from '../assets/menu/Milk_Tea_Menu.png';
import phoMenu from '../assets/menu/Pho_Menu.png';
import riceVermicelliMenu from '../assets/menu/Rice_Vermicelli_Menu.png';
import vietEntreesMenu from '../assets/menu/Viet_Entrees.png';
import wingFriesMenu from '../assets/menu/Wing_Fries_Zone_Menu.png';


// --- Strong Types for Menu Details (No changes needed here) ---
interface MenuItemDetail {
  name: string;
  price: string;
  description?: string;
}

interface MenuCategoryDetail {
  categoryTitle: string;
  items: MenuItemDetail[];
}

// --- Main Poster Structure (No changes needed here) ---
export interface MenuPoster {
  imageSrc: string;
  altText: string;
  category: 'Food' | 'Drinks' | 'Desserts';
  details: MenuCategoryDetail[];
}

// --- STEP 2: The new, updated menu data ---
export const menuData: MenuPoster[] = [
  // --- Food Menus ---
  {
    imageSrc: appetizersMenu,
    altText: "Small Bites & Appetizers Menu",
    category: 'Food',
    details: [
      {
        categoryTitle: 'Small Bites & Appetizers',
        items: [
          { name: "Steamed Shrimp Hacao", price: "$6.75 - 4pcs / $8.50 - 6pcs" },
          { name: "Mango Bowl", price: "$6.35" },
          { name: "Steamed Shumai", price: "$6.75 - 4pcs / $8.50 - 6pcs", description: "(Contains Chicken, Pork & Shrimp)" },
          { name: "Crispy Spring Rolls", price: "$6.85 - 2pcs / $8.50 - 3pcs", description: "(Contains Shrimp & Pork - Vegetable Option Available)" },
          { name: "Crispy Musubi", price: "$8.75 - 2pcs / $11 - 3pcs" },
          { name: "Fresh Summer Rolls", price: "$7.85 - 2pcs / $10 - 3pcs", description: "Protein Choice (1): Shrimp | Pork | Beef | Chicken | Tofu" },
          { name: "Avocado Rolls", price: "$7.80 - 2pcs / $10 - 3pcs" },
          { name: "Steamed Buns", price: "$8.75 - 2pcs / $11 - 3pcs", description: "Protein Choice (1): Pork | Beef | Chicken" },
          { name: "Coconut Shrimp", price: "$9 - 3pcs / $11 - 4pcs" },
          { name: "Pineapple & Pork Skewers", price: "$9 - 3pcs / $11 - 4pcs" },
          { name: "Crispy Shrimp & Chicken Wonton", price: "$8.75 - 3pcs / $11 - 4pcs" },
          { name: "Chicken Skewers", price: "$9 - 3pcs / $11 - 4pcs" },
        ]
      }
    ]
  },
  {
    imageSrc: banhMiMenu,
    altText: "Banh Mi - Fresh & Lite Menu",
    category: 'Food',
    details: [
      {
        categoryTitle: 'Banh Mi - Fresh & Lite',
        items: [
            { name: "Banh Mi with Grilled Meat", price: "$11", description: "Protein Choice (1) Pork | Beef | Chicken | Fried Tofu" },
            { name: "Banh Mi with Grilled Shrimp", price: "$13.50" },
            { name: "Banh Mi Cheese Steak", price: "$13" },
            { name: "Mango Salad", price: "$10.50" },
            { name: "Steamed Vegetables with Grilled Meat", price: "$17", description: "Protein Choice (1) Pork | Beef | Chicken | Fried Tofu | +$3 Shrimp" }
        ]
      }
    ]
  },
  {
    imageSrc: phoMenu,
    altText: "Pho Menu",
    category: 'Food',
    details: [
        {
            categoryTitle: 'Pho',
            items: [
                { name: "Pho Beef Combination", price: "$18", description: "Includes { Eye Round, Brisket, Flank, Meatball, Tendon }" },
                { name: "Pho Beef", price: "$15", description: "Protein Choice (2) Eye Round | Brisket | Flank | Tendon | Meatball" },
                { name: "Pho Shrimp", price: "$17" },
                { name: "Pho Vegetarian", price: "$15", description: "Includes { Broccoli, Carrot, Mushroom - Vegie Broth }" },
                { name: "Pho Chicken", price: "$15", description: "(White Meat - Chicken Broth)" }
            ]
        }
    ]
  },
{
    imageSrc: riceVermicelliMenu,
    altText: "Rice & Noodles Menu",
    category: 'Food',
    details: [
      {
        categoryTitle: 'Rice & Noodles',
        items: [
          { name: "Rice with Grilled Meat", price: "$15", description: "Protein Choice (1): Pork | Beef | Chicken | Fried Tofu | +$4 Combination | +$3 Shrimp" },
          { name: "Fried Rice with Grilled Meat", price: "$17", description: "Protein Choice (1): Pork | Beef | Chicken | Fried Tofu | +$4 Combination | +$3 Shrimp" },
          { name: "Pineapple Fried Rice", price: "$19", description: "Protein Choice (1): Pork | Beef | Chicken | Fried Tofu | +$4 Combination | +$3 Shrimp" },
          { name: "Curry Fried Rice", price: "$17", description: "Protein Choice (1): Pork | Beef | Chicken | Fried Tofu | +$4 Combination | +$3 Shrimp" },
          { name: "Vermicelli Noodle with Grilled Meat", price: "$15", description: "Protein Choice (1): Pork | Beef | Chicken | Fried Tofu | +$3 Shrimp" },
          { name: "Vermicelli Noodle Combination", price: "$19", description: "Chicken, Beef, Pork & Shrimp" },
        ]
      }
    ]
  },
{
    imageSrc: vietEntreesMenu,
    altText: "Viet Entrees Menu",
    category: 'Food',
    details: [
      {
        categoryTitle: 'Viet Entrees',
        items: [
          { name: "Garlic Noodle with Shrimp", price: "$19" },
          { name: "Garlic Noodle with Grilled Meat", price: "$16", description: "Protein Choice (1): Pork | Beef | Chicken | Fried Tofu | +$2 Combination | +$7 Crab" },
          { name: "Steamed Salmon", price: "$22", description: "With Rice / Steamed Veggie / French Fries. Sauce Options: Teriyaki | Honey Garlic | Fish Sauce" },
          { name: "Pad Thai with Grilled Meat", price: "$16", description: "Protein Choice (1): Pork | Beef | Chicken | Fried Tofu | +$2 Combination. Contains Egg & Peanuts." },
          { name: "Pad Thai with Shrimp", price: "$19", description: "Contains Egg & Peanuts." },
        ]
      }
    ]
  },
{
    imageSrc: wingFriesMenu,
    altText: "Wing & Fries Zone Menu",
    category: 'Food',
    details: [
      {
        categoryTitle: 'Wing & Fries Zone',
        items: [
          { name: "Chicken Wings", price: "$12 - 6pcs / $17 - 10pcs", description: "Sauce Flavors (Up to 2): Viet Mamba | Garlic Honey Soy | Mango Habanero | Sweet & Sour | Salt & Pepper | Buffalo" },
          { name: "Parmesan Fries", price: "$6.80" },
          { name: "French Fries", price: "$4.75" },
          { name: "Viet Fries", price: "$11", description: "Protein Choice (1): Pork | Beef | Chicken" },
        ]
      }
    ]
  },
  // --- Drinks Menus ---
  {
    imageSrc: coffeeMenu,
    altText: "Coffee Menu",
    category: 'Drinks',
    details: [
        {
            categoryTitle: 'Coffee',
            items: [
                { name: "Vietnamese Coffee", price: "$7.25" },
                { name: "Creamy Vietnamese Coffee", price: "$7.25" },
                { name: "Vietnamese Coffee Crème Brule", price: "$7.25" },
                { name: "Caramel Vietnamese Coffee", price: "$7.25" }
            ]
        }
    ]
  },
{
    imageSrc: fruitTeaMenu,
    altText: "Fruit Tea & Lemonade Menu",
    category: 'Drinks',
    details: [
      {
        categoryTitle: 'Fruit Tea & Lemonades',
        items: [
          { name: "Butterfly Sky-burst Lemonade", price: "$7.25" },
          { name: "Butterfly Pea Lemonade", price: "$7.25" },
          { name: "Fruit Tea", price: "$7.25", description: "Choice: Strawberry | Mango | Peach | Passion Fruit" },
          { name: "Refreshing Fruity Soda", price: "$7.25", description: "Choice: Strawberry | Mango | Peach | Passion Fruit" },
          { name: "Pineapple Peach Lemonade", price: "$7.25" },
        ]
      }
    ]
  },
/* {
    imageSrc: matchaMenu,
    altText: "Matcha Special - UYOJI WAVES Menu",
    category: 'Drinks',
    details: [
      {
        categoryTitle: 'UVOJI WAVES',
        items: [
          { name: "MATCHA LATTE", price: "$X.XX" },
          { name: "MANGO MATCHA LATTE", price: "$X.XX" },
          { name: "STRAWBERRY MATCHA LATTE", price: "$X.XX" },
          { name: "EARTH MATCHA", price: "$X.XX" },
          { name: "BROWN SUGAR MATCHA LATTE", price: "$X.XX" },
        ]
      }
    ]
  }, */
{
    imageSrc: milkTeaMenu,
    altText: "Milk Tea Menu",
    category: 'Drinks',
    details: [
      {
        categoryTitle: 'Milk Tea',
        items: [
          { name: "Thai Milk Tea", price: "(S) $5.50 - (L) $6.50" },
          { name: "Taro Milk Tea", price: "(S) $5.50 - (L) $6.50" },
          { name: "Crème Brule Milk Tea", price: "(S) $5.50 - (L) $6.50" },
          { name: "Classic Milk Tea", price: "(S) $5.50 - (L) $6.50" },
          { name: "Brown Sugar Latte", price: "(S) $5.50 - (L) $6.50" },
          { name: "Brown Sugar Crème Brule", price: "(S) $5.50 - (L) $6.50" },
          { name: "Chocolate Latte", price: "(S) $5.50 - (L) $6.50" },
        ]
      }
    ]
  },
  // --- Desserts Menu ---
{
    imageSrc: dessertMenu,
    altText: "Desserts Menu",
    category: 'Desserts',
    details: [
      {
        categoryTitle: 'Desserts',
        items: [
          { name: "Chocolate Cake", price: "$5.95" },
          { name: "Mango Mousse", price: "$5.95" },
          { name: "Crème Brulee Cheese Cake", price: "$5.95" },
          { name: "Tiramisu", price: "$5.95" },
          { name: "Key Lime Pie", price: "$5.95" },
        ]
      }
    ]
  },
];