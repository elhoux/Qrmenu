import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface PromoBannerData {
  id: string;
  discount: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  bgColor: string;
}

const promoBanners: PromoBannerData[] = [
  {
    id: '1',
    discount: '30%',
    title: 'DISCOUNT ONLY',
    subtitle: 'VALID FOR TODAY!',
    imageUrl: 'https://images.pexels.com/photos/1556909/pexels-photo-1556909.jpeg?auto=compress&cs=tinysrgb&w=200',
    bgColor: 'from-primary to-primary/90'
  },
  {
    id: '2',
    discount: '25%',
    title: 'SPECIAL OFFER',
    subtitle: 'LIMITED TIME!',
    imageUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=200',
    bgColor: 'from-orange-500 to-orange-600'
  },
  {
    id: '3',
    discount: '20%',
    title: 'FLASH SALE',
    subtitle: 'HURRY UP!',
    imageUrl: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=200',
    bgColor: 'from-purple-500 to-purple-600'
  },
  {
    id: '4',
    discount: '15%',
    title: 'WEEKEND DEAL',
    subtitle: 'DON\'T MISS OUT!',
    imageUrl: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=200',
    bgColor: 'from-pink-500 to-pink-600'
  }
];

const PromoBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === promoBanners.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    navigate('/special-offers');
  };

  const currentBanner = promoBanners[currentIndex];

  return (
    <div className="relative mb-6 overflow-hidden">
      <div 
        onClick={handleClick}
        className={`relative bg-gradient-to-r ${currentBanner.bgColor} rounded-2xl p-6 overflow-hidden cursor-pointer active:scale-95 transition-all duration-500 ease-in-out`}
      >
        <div className="relative z-10">
          <div className="text-white">
            <div className="text-4xl font-bold mb-1 transition-all duration-500">
              {currentBanner.discount}
            </div>
            <div className="text-sm font-medium opacity-90 transition-all duration-500">
              {currentBanner.title}
            </div>
            <div className="text-xs opacity-75 transition-all duration-500">
              {currentBanner.subtitle}
            </div>
          </div>
        </div>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 transition-all duration-500">
          <img
            src={currentBanner.imageUrl}
            alt="Food offer"
            className="w-20 h-20 rounded-xl object-cover transition-all duration-500"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-transparent"></div>
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-3">
        {promoBanners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-primary w-6' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PromoBanner;