import React, { useState } from 'react';
import { FiGrid, FiList } from 'react-icons/fi';
import { restaurants as initialRestaurants } from '../mock/menu';
import RestaurantCard from './RestaurantCard';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState(initialRestaurants);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const handleToggleFavorite = (id: string) => {
    setRestaurants(prev => 
      prev.map(restaurant => 
        restaurant.id === id 
          ? { ...restaurant, isFavorite: !restaurant.isFavorite }
          : restaurant
      )
    );
  };

  return (
    <div>
      {/* View Mode Toggle */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-text-primary">Restaurants</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'list' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
            aria-label="List view"
          >
            <FiList size={18} />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'grid' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
            aria-label="Grid view"
          >
            <FiGrid size={18} />
          </button>
        </div>
      </div>

      {/* Restaurant Cards */}
      <div className={
        viewMode === 'grid' 
          ? 'grid grid-cols-2 gap-3' 
          : 'space-y-3'
      }>
        {restaurants.map(restaurant => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            viewMode={viewMode}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;