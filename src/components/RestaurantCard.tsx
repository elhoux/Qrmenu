import React from 'react';
import PriceTag from './PriceTag';
import RatingStars from './RatingStars';
import LikeButton from './LikeButton';

interface RestaurantCardProps {
  productId: number;
  profileId: number;
  name: string;
  image: string;
  rating: number;
  price: number;
  distance: string;
  deliveryTime: string;
  category: string;
  onClick?: () => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  productId,
  profileId,
  name,
  image = '/images/default-image.jpg', // Default image
  rating = 0, // Default rating
  price = 0, // Default price
  distance,
  deliveryTime,
  category,
  onClick
}) => {
  const resolveImageSrc = (src?: string) => {
    if (!src) return '/images/default-image.jpg';
    if (src.startsWith('http')) return src;
    return `http://localhost:5000${src.startsWith('/') ? '' : '/'}${src}`;
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 active:scale-95 transition-transform cursor-pointer"
    >
      <div className="relative mb-3">
        <img
          src={resolveImageSrc(image)}
          alt={name}
          className="w-full h-24 rounded-xl object-cover"
          loading="lazy"
        />
        <div className="absolute top-2 right-2">
          <LikeButton productId={productId} profileId={profileId} />
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex items-start justify-between">
          <h3 className="font-medium text-text-primary line-clamp-1">{name}</h3>
          <PriceTag price={price} />
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <RatingStars rating={rating} />
            <span className="text-text-secondary">({typeof rating === 'number' ? rating.toFixed(1) : 'N/A'})</span>
          </div>
          <span className="text-text-secondary">{category}</span>
        </div>

        {(distance || deliveryTime) && (
          <div className="flex items-center justify-between text-sm text-text-secondary">
            {distance && <span>{distance}</span>}
            {deliveryTime && <span>{deliveryTime}</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantCard;