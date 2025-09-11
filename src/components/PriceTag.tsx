import React from 'react';

interface PriceTagProps {
  price: number;
  originalPrice?: number;
  className?: string;
}

const PriceTag: React.FC<PriceTagProps> = ({ price, originalPrice, className = '' }) => {
  const formattedPrice = typeof price === 'number' ? price.toFixed(2) : 'N/A';
  const formattedOriginalPrice = typeof originalPrice === 'number' ? originalPrice.toFixed(2) : 'N/A';

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-primary font-semibold">
        ${formattedPrice}
      </span>
      {originalPrice && (
        <span className="text-text-secondary text-xs line-through">
          ${formattedOriginalPrice}
        </span>
      )}
    </div>
  );
};

export default PriceTag;