export interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: 'Pho' | 'Noodle Soups' | 'Appetizers' | 'Bubble Tea';
  imageUrl: string;
  isFeatured?: boolean;
}

export const mockMenuItems: MenuItem[] = [
  {
    _id: '1',
    name: 'Classic Pho Bo',
    description: 'Aromatic beef broth with rice noodles, tender beef slices, and fresh herbs.',
    price: 14.99,
    category: 'Pho',
    imageUrl: '/src/assets/menu/PinaColada.jpg',
    isFeatured: true,
  },
  {
    _id: '2',
    name: 'Spicy Chicken Noodle Soup',
    description: 'A fiery chicken broth with shredded chicken, rice noodles, and a blend of chili and spices.',
    price: 13.99,
    category: 'Noodle Soups',
    imageUrl: '/src/assets/menu/PinaColada.jpg',
  },
  {
    _id: '3',
    name: 'Crispy Spring Rolls',
    description: 'Golden-fried spring rolls filled with pork, shrimp, and vegetables, served with a sweet chili sauce.',
    price: 7.99,
    category: 'Appetizers',
    imageUrl: '/src/assets/menu/PinaColada.jpg', // Placeholder
  },
  {
    _id: '4',
    name: 'Classic Milk Tea',
    description: 'Rich black tea combined with creamy milk and classic tapioca pearls.',
    price: 5.50,
    category: 'Bubble Tea',
    imageUrl: '/src/assets/menu/PinaColada.jpg',
    isFeatured: true,
  },
  {
    _id: '5',
    name: 'Galaxy Strawberry Tea',
    description: 'A vibrant and refreshing strawberry green tea with butterfly pea flower tea for a stunning visual effect.',
    price: 6.00,
    category: 'Bubble Tea',
    imageUrl: '/src/assets/menu/PinaColada.jpg',
    isFeatured: true,
  },
  {
    _id: '6',
    name: 'Vegetable Pho',
    description: 'A hearty vegetable broth with tofu, mushrooms, bok choy, and fresh herbs.',
    price: 13.99,
    category: 'Pho',
    imageUrl: '/src/assets/gallery/store_front1.jpg', // Placeholder
  },
];