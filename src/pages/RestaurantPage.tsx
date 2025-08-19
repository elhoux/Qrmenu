import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiStar, FiMapPin, FiClock } from 'react-icons/fi';

interface Restaurant {
  id: string;
  name: string;
  imageUrl: string;
  logoUrl: string;
  rating: number;
  reviewsCount: number;
  cuisine: string;
  distance: string;
  deliveryTime: string;
  isOpen: boolean;
  description: string;
}

const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Gabriel Kreuther',
    imageUrl: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400',
    logoUrl: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 4.8,
    reviewsCount: 1247,
    cuisine: 'Cuisine française',
    distance: '1.2 km',
    deliveryTime: '25-35 min',
    isOpen: true,
    description: 'Restaurant gastronomique français'
  },
  {
    id: '2',
    name: 'Sushi Zen',
    imageUrl: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=400',
    logoUrl: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 4.6,
    reviewsCount: 892,
    cuisine: 'Cuisine japonaise',
    distance: '0.8 km',
    deliveryTime: '20-30 min',
    isOpen: true,
    description: 'Sushi frais et authentique'
  },
  {
    id: '3',
    name: 'Bella Italia',
    imageUrl: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400',
    logoUrl: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 4.7,
    reviewsCount: 654,
    cuisine: 'Cuisine italienne',
    distance: '1.5 km',
    deliveryTime: '30-40 min',
    isOpen: false,
    description: 'Pizzas et pâtes traditionnelles'
  }
];
const RestaurantPage = () => {
  const navigate = useNavigate();

  const handleRestaurantClick = (restaurantId: string) => {
    navigate(`/restaurant/${restaurantId}`);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-mobile mx-auto px-4 pt-12">
        <h1 className="text-2xl font-semibold text-text-primary mb-6">
          Restaurants
        </h1>
        
        <div className="space-y-4">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              onClick={() => handleRestaurantClick(restaurant.id)}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 active:scale-95 transition-transform cursor-pointer"
            >
              <div className="relative h-48">
                <img
                  src={restaurant.imageUrl}
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                
                {/* Logo du restaurant */}
                <div className="absolute bottom-4 left-4">
                  <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden bg-white">
                    <img
                      src={restaurant.logoUrl}
                      alt={`${restaurant.name} logo`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Statut ouvert/fermé */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    restaurant.isOpen 
                      ? 'bg-primary text-white' 
                      : 'bg-red-500 text-white'
                  }`}>
                    {restaurant.isOpen ? 'Ouvert' : 'Fermé'}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-text-primary text-lg mb-1">
                      {restaurant.name}
                    </h3>
                    <p className="text-text-secondary text-sm mb-2">
                      {restaurant.description}
                    </p>
                    <span className="text-primary text-sm font-medium">
                      {restaurant.cuisine}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 ml-3">
                    <FiStar size={16} className="text-accent fill-current" />
                    <span className="font-medium text-text-primary">
                      {restaurant.rating}
                    </span>
                    <span className="text-text-secondary text-sm">
                      ({restaurant.reviewsCount})
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-text-secondary">
                  <div className="flex items-center gap-1">
                    <FiMapPin size={14} />
                    <span>{restaurant.distance}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FiClock size={14} />
                    <span>{restaurant.deliveryTime}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;