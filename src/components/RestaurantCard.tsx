import React from 'react';
import { FiHeart } from 'react-icons/fi';
import { RestaurantCard as RestaurantCardType } from '../mock/menu';

interface RestaurantCardProps {
  restaurant: RestaurantCardType;
  onToggleFavorite?: (id: string) => void;
  viewMode?: 'list' | 'grid';
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onToggleFavorite, viewMode = 'list' }) => {
  if (viewMode === 'grid') {
    return (
      <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 active:scale-95 transition-transform">
        <div className="relative mb-3">
          <img
            src={restaurant.imageUrl}
            alt={restaurant.title}
            className="w-full h-24 rounded-xl object-cover"
            loading="lazy"
          />
          <button
            onClick={() => onToggleFavorite?.(restaurant.id)}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors"
            aria-label={restaurant.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <FiHeart 
              size={14} 
              className={`
                ${restaurant.isFavorite 
                  ? 'text-danger fill-current' 
                  : 'text-gray-400'
                }
              `} 
            />
          </button>
        </div>
        
        <div>
          <h3 className="font-medium text-text-primary text-sm mb-1 line-clamp-2">
            {restaurant.title}
          </h3>
          <div className="flex items-center justify-between text-xs text-text-secondary mb-1">
            {restaurant.sizeLabel && (
              <span>{restaurant.sizeLabel}</span>
            )}
            {restaurant.rating && (
              <div className="flex items-center gap-1">
                <span>⭐</span>
                <span>{restaurant.rating}</span>
              </div>
            )}
          </div>
          {restaurant.price && (
            <span className="text-primary font-semibold text-sm">
              ${restaurant.price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100 active:scale-95 transition-transform">
      <div className="flex items-center gap-4">
        <img
          src={restaurant.imageUrl}
          alt={restaurant.title}
          className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
          loading="lazy"
        />
        
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-text-primary mb-1 truncate">
            {restaurant.title}
          </h3>
          <div className="flex items-center gap-3 text-xs text-text-secondary">
            {restaurant.sizeLabel && (
              <span>{restaurant.sizeLabel}</span>
            )}
            {restaurant.rating && (
              <div className="flex items-center gap-1">
                <span>⭐</span>
                <span>{restaurant.rating}</span>
              </div>
            )}
            {restaurant.price && (
              <span className="text-primary font-medium">
                ${restaurant.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={() => onToggleFavorite?.(restaurant.id)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label={restaurant.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <FiHeart 
            size={20} 
            className={`
              ${restaurant.isFavorite 
                ? 'text-danger fill-current' 
                : 'text-gray-400 hover:text-gray-500'
              }
            `} 
          />
        </button>
      </div>
    </div>
  );
};

export default RestaurantCard;