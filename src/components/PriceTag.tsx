import React from 'react';

interface PriceTagProps {
  price: number;
  originalPrice?: number;
  className?: string;
}

const PriceTag: React.FC<PriceTagProps> = ({ price, originalPrice, className = '' }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-primary font-semibold">
        ${price.toFixed(2)}
      </span>
      {originalPrice && (
        <span className="text-text-secondary text-xs line-through">
          ${originalPrice.toFixed(2)}
        </span>
      )}
    </div>
  );
};

export default PriceTag;