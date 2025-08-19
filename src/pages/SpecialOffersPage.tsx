import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

interface SpecialOffer {
  id: string;
  discount: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  bgColor: string;
}

const specialOffers: SpecialOffer[] = [
  {
    id: '1',
    discount: '30%',
    title: 'DISCOUNT ONLY',
    subtitle: 'VALID FOR TODAY!',
    imageUrl: 'https://images.pexels.com/photos/1556909/pexels-photo-1556909.jpeg?auto=compress&cs=tinysrgb&w=300',
    bgColor: 'bg-gradient-to-r from-primary to-primary/90'
  },
  {
    id: '2',
    discount: '15%',
    title: 'DISCOUNT ONLY',
    subtitle: 'VALID FOR TODAY!',
    imageUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300',
    bgColor: 'bg-gradient-to-r from-orange-400 to-orange-500'
  },
  {
    id: '3',
    discount: '20%',
    title: 'DISCOUNT ONLY',
    subtitle: 'VALID FOR TODAY!',
    imageUrl: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=300',
    bgColor: 'bg-gradient-to-r from-pink-400 to-pink-500'
  },
  {
    id: '4',
    discount: '25%',
    title: 'DISCOUNT ONLY',
    subtitle: 'VALID FOR TODAY!',
    imageUrl: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=300',
    bgColor: 'bg-gradient-to-r from-blue-400 to-blue-500'
  }
];

const SpecialOffersPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 px-4 py-4 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <button
            onClick={handleBack}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <FiArrowLeft size={24} className="text-text-primary" />
          </button>
          <h1 className="text-lg font-semibold text-text-primary">
            Special Offers
          </h1>
        </div>
      </div>

      {/* Special Offers List */}
      <div className="px-4 py-6 space-y-4">
        {specialOffers.map((offer) => (
          <div
            key={offer.id}
            className={`relative ${offer.bgColor} rounded-2xl p-6 overflow-hidden active:scale-95 transition-transform cursor-pointer`}
          >
            <div className="relative z-10 flex items-center justify-between">
              <div className="text-white">
                <div className="text-4xl font-bold mb-1">
                  {offer.discount}
                </div>
                <div className="text-sm font-medium opacity-90 leading-tight">
                  {offer.title}<br />
                  {offer.subtitle}
                </div>
              </div>
              <div className="flex-shrink-0">
                <img
                  src={offer.imageUrl}
                  alt="Food offer"
                  className="w-20 h-20 rounded-xl object-cover shadow-lg"
                  loading="lazy"
                />
              </div>
            </div>
            
            {/* Subtle overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-transparent"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialOffersPage;