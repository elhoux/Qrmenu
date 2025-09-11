import React from 'react';
import { FiStar } from 'react-icons/fi';

interface RatingStarsProps {
  rating: number;
  reviewsCount?: number;
  className?: string;
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating, reviewsCount, className = '' }) => {
  const formattedRating = typeof rating === 'number' ? rating.toFixed(1) : 'N/A';

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <FiStar size={12} className="text-accent fill-current" />
      <span className="text-xs text-text-secondary">
        {formattedRating}
        {reviewsCount && ` (${reviewsCount})`}
      </span>
    </div>
  );
};

export default RatingStars;