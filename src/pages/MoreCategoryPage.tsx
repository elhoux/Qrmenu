import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

interface CategoryItem {
  id: string;
  name: string;
  icon: string;
}

const categories: CategoryItem[] = [
  { id: '1', name: 'Hamburger', icon: '🍔' },
  { id: '2', name: 'Pizza', icon: '🍕' },
  { id: '3', name: 'Noodles', icon: '🍜' },
  { id: '4', name: 'Meat', icon: '🥩' },
  { id: '5', name: 'Vegetable', icon: '🥬' },
  { id: '6', name: 'Dessert', icon: '🧁' },
  { id: '7', name: 'Drink', icon: '🍺' },
  { id: '8', name: 'Bread', icon: '🍞' },
  { id: '9', name: 'Croissant', icon: '🥐' },
  { id: '10', name: 'Pancakes', icon: '🥞' },
  { id: '11', name: 'Cheese', icon: '🧀' },
  { id: '12', name: 'French Fr.', icon: '🍟' },
  { id: '13', name: 'Sandwich', icon: '🥪' },
  { id: '14', name: 'Taco', icon: '🌮' },
  { id: '15', name: 'Pot of Fo...', icon: '🍲' },
  { id: '16', name: 'Salad', icon: '🥗' },
  { id: '17', name: 'Bento', icon: '🍱' },
  { id: '18', name: 'Cooked Ri...', icon: '🍚' },
  { id: '19', name: 'Spaghetti', icon: '🍝' },
  { id: '20', name: 'Sushi', icon: '🍣' },
  { id: '21', name: 'Ice Crea...', icon: '🍦' },
  { id: '22', name: 'Cookies', icon: '🍪' },
  { id: '23', name: 'Beverage', icon: '🧃' },
  { id: '24', name: 'Others', icon: '🍽️' },
];

const MoreCategoryPage = () => {
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
            More Category
          </h1>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4 sm:gap-6">
          {categories.map((category) => (
            <button
              key={category.id}
              className="flex flex-col items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-2xl hover:bg-gray-50 active:scale-95 transition-all duration-200"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-xl sm:text-2xl">
                {category.icon}
              </div>
              <span className="text-xs sm:text-sm font-medium text-text-primary text-center leading-tight">
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoreCategoryPage;