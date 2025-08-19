export interface Category {
  id: string;
  name: string;
  icon: string;
  isActive?: boolean;
}

export interface ProductCard {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  originalPrice?: number;
  isPromo?: boolean;
  rating?: number;
  reviewsCount?: number;
  distanceMin?: number;
}

export interface RestaurantCard {
  id: string;
  imageUrl: string;
  title: string;
  sizeLabel?: string;
  rating?: number;
  price?: number;
  distanceKm?: number;
  isFavorite?: boolean;
}

export const categories: Category[] = [
  { id: '1', name: 'Promotions', icon: '🏷️', isActive: true },
  { id: '2', name: 'Healthy', icon: '🥗' },
  { id: '3', name: 'Asian', icon: '🍜' },
  { id: '4', name: 'Burgers', icon: '🍔' },
  { id: '5', name: 'Pizza', icon: '🍕' },
  { id: '6', name: 'Desserts', icon: '🍰' },
  { id: '7', name: 'Drinks', icon: '🥤' },
];

export const discountProducts: ProductCard[] = [
  {
    id: '1',
    imageUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Mixed Salad Bowl',
    price: 6.00,
    originalPrice: 8.50,
    isPromo: true,
    rating: 4.9,
    reviewsCount: 124,
    distanceMin: 15,
  },
  {
    id: '2',
    imageUrl: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Vegetarian Menu',
    price: 5.50,
    originalPrice: 8.00,
    isPromo: true,
    rating: 4.8,
    reviewsCount: 89,
    distanceMin: 12,
  },
  {
    id: '3',
    imageUrl: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Grilled Chicken',
    price: 8.50,
    originalPrice: 12.00,
    isPromo: true,
    rating: 4.7,
    reviewsCount: 156,
    distanceMin: 18,
  },
];

export const restaurants: RestaurantCard[] = [
  {
    id: '1',
    imageUrl: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Vegetarian Noodles',
    sizeLabel: '800 ml',
    rating: 4.9,
    price: 22.00,
    distanceKm: 1.5,
    isFavorite: true,
  },
  {
    id: '2',
    imageUrl: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Pizza Hut - Luminta',
    sizeLabel: '2 km',
    rating: 4.8,
    price: 19.50,
    distanceKm: 2.0,
    isFavorite: false,
  },
  {
    id: '3',
    imageUrl: 'https://images.pexels.com/photos/1556909/pexels-photo-1556909.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Mozzarella Cheese Burger',
    sizeLabel: '6 km',
    rating: 4.6,
    price: 22.50,
    distanceKm: 6.0,
    isFavorite: true,
  },
  {
    id: '4',
    imageUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Fresh Garden Salad',
    sizeLabel: '500 ml',
    rating: 4.7,
    price: 15.00,
    distanceKm: 1.2,
    isFavorite: false,
  },
  {
    id: '5',
    imageUrl: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Grilled Chicken Bowl',
    sizeLabel: '750 ml',
    rating: 4.9,
    price: 18.50,
    distanceKm: 2.5,
    isFavorite: true,
  },
];