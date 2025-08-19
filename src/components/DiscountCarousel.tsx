import React from 'react';
import { useNavigate } from 'react-router-dom';
import { discountProducts, ProductCard } from '../mock/menu';
import PriceTag from './PriceTag';
import RatingStars from './RatingStars';
import IconBadge from './IconBadge';

interface ProductCardProps {
  product: ProductCard;
  onClick?: () => void;
}

const ProductCardComponent: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="flex-shrink-0 w-48 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer active:scale-95 transition-transform"
    >
      <div className="relative">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-32 object-cover"
          loading="lazy"
        />
        {product.isPromo && (
          <div className="absolute top-2 left-2">
            <IconBadge text="PROMO" variant="promo" />
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium text-text-primary mb-2 text-sm leading-tight">
          {product.title}
        </h3>
        <div className="flex items-center justify-between mb-2">
          <PriceTag price={product.price} originalPrice={product.originalPrice} />
        </div>
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <span>{product.distanceMin} min</span>
          {product.rating && (
            <RatingStars rating={product.rating} reviewsCount={product.reviewsCount} />
          )}
        </div>
      </div>
    </div>
  );
};

const DiscountCarousel = () => {
  const navigate = useNavigate();

  const handleProductClick = (productId: string) => {
    navigate(`/dish/${productId}`);
  };

  return (
    <div className="mb-6">
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2" style={{ scrollSnapType: 'x mandatory' }}>
        {discountProducts.map((product) => (
          <div key={product.id} style={{ scrollSnapAlign: 'start' }}>
            <ProductCardComponent 
              product={product} 
              onClick={() => handleProductClick(product.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscountCarousel;