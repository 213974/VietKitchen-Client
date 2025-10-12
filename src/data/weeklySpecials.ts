// Defines the structure for a single special item within a day.
interface SpecialItem {
  price: string;
  name: string;
  description?: string; // Optional field for sub-text
}

// Defines the structure for all specials on a given day of the week.
export interface WeeklySpecial {
  day: 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  specials: SpecialItem[];
}

// The complete list of weekly specials, with consistent data structure.
export const weeklySpecialsData: WeeklySpecial[] = [
  {
    day: 'Monday',
    specials: [
      { price: '$11.85', name: 'Pho', description: '(Beef or Chicken)' },
      { price: 'BOGO', name: 'Crispy Dumplings' },
      { price: 'BOGO', name: 'Steamed Shumai' },
      { price: 'BOGO', name: 'Shrimp Hacao' },
    ],
  },
  {
    day: 'Tuesday',
    specials: [
      { price: 'BOGO', name: 'Banh Mi', description: '(Chicken, Beef, Pork)' },
      { price: 'BOGO', name: 'Steamed Buns' },
    ],
  },
  {
    day: 'Wednesday',
    specials: [
      { price: '$11.85', name: 'Pho', description: '(Beef or Chicken)' },
      { price: 'BOGO', name: 'Chicken Wonton' },
    ],
  },
  {
    day: 'Thursday',
    specials: [
      { price: '$15', name: 'Steamed Salmon', description: '(w/ Steamed Vegetables, Rice, or Fries)' },
      { price: '$13', name: 'Pad Thai / Garlic Noodles', description: '(Chicken, Beef, or Pork)' },
    ],
  },
  {
    day: 'Friday',
    specials: [
      { price: 'BOGO', name: 'Chicken Wings' },
      { price: '$5', name: 'All Drinks', description: 'Smoothies, Milk Tea, Fruit Tea & Lemonade' },
    ],
  },
  {
    day: 'Saturday',
    specials: [
      { price: '$10', name: 'Rice Bowl', description: '(Chicken, Beef, or Pork)' },
      { price: '$5', name: 'All Drinks', description: 'Smoothies, Milk Tea, Fruit Tea & Lemonade' },
    ],
  },
  {
    day: 'Sunday',
    specials: [
      { price: '$12', name: 'Vermicelli Noodle Bowl', description: '(Chicken, Beef, or Pork)' },
      { price: '$6', name: 'Matcha Drinks' },
    ],
  },
];