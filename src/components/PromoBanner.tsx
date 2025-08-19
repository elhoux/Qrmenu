import React from 'react';
import { useNavigate } from 'react-router-dom';

const PromoBanner = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/special-offers');
  };

  return (
    <div 
      onClick={handleClick}
      className="relative bg-gradient-to-r from-primary to-primary/90 rounded-2xl p-6 mb-6 overflow-hidden cursor-pointer active:scale-95 transition-transform"
    >
      <div className="relative z-10">
        <div className="text-white">
          <div className="text-4xl font-bold mb-1">30%</div>
          <div className="text-sm font-medium opacity-90">
            DISCOUNT ONLY VALID FOR TODAY!
          </div>
        </div>
      </div>
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
        <img
          src="https://images.pexels.com/photos/1556909/pexels-photo-1556909.jpeg?auto=compress&cs=tinysrgb&w=200"
          alt="Burger"
          className="w-20 h-20 rounded-xl object-cover"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent"></div>
    </div>
  );
};

export default PromoBanner;