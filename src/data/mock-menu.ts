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
    category: 'Bubble Tea',
    imageUrl: '/src/assets/gallery/PinaColada.jpg',
    isFeatured: true,
  },
  {
    _id: '2',
    name: 'Spicy Chicken Noodle Soup',
    description: 'A fiery chicken broth with shredded chicken, rice noodles, and a blend of chili and spices.',
    price: 13.99,
    category: 'Bubble Tea',
    imageUrl: '/src/assets/gallery/ThaiTeaSmoothie.jpg',
    isFeatured: true,
  },
  {
    _id: '3',
    name: 'Crispy Spring Rolls',
    description: 'Golden-fried spring rolls filled with pork, shrimp, and vegetables, served with a sweet chili sauce.',
    price: 7.99,
    category: 'Bubble Tea',
    imageUrl: '/src/assets/gallery/TropicalMangoSmoothie.jpg',
    isFeatured: true,
  }
];