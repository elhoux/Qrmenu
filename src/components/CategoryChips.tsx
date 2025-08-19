import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMoreHorizontal } from 'react-icons/fi';
import { categories } from '../mock/menu';
import SectionHeader from './SectionHeader';

const CategoryChips = () => {
  const [activeCategory, setActiveCategory] = useState('1');
  const navigate = useNavigate();

  const handleMoreClick = () => {
    navigate('/more-category');
  };

  const handleSeeAllClick = () => {
    navigate('/more-category');
  };
  return (
    <div className="mb-6">
      <SectionHeader 
        title="Categories" 
        showSeeAll={true}
        onSeeAllClick={handleSeeAllClick}
      />
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`
              flex-shrink-0 flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-200
              ${activeCategory === category.id
                ? 'bg-emerald-50 border-2 border-primary'
                : 'bg-white border-2 border-transparent hover:border-gray-200 shadow-sm'
              }
            `}
          >
            <div className={`
              w-12 h-12 rounded-full flex items-center justify-center text-xl
              ${activeCategory === category.id ? 'bg-primary/10' : 'bg-gray-50'}
            `}>
              {category.icon}
            </div>
            <span className={`
              text-xs font-medium
              ${activeCategory === category.id ? 'text-primary' : 'text-text-secondary'}
            `}>
              {category.name}
            </span>
          </button>
        ))}
        
        {/* More Button */}
        <button
          onClick={handleMoreClick}
          className="flex-shrink-0 flex flex-col items-center gap-2 p-3 rounded-2xl bg-white border-2 border-transparent hover:border-gray-200 shadow-sm transition-all duration-200"
        >
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-50">
            <FiMoreHorizontal size={20} className="text-text-secondary" />
          </div>
          <span className="text-xs font-medium text-text-secondary">
            More
          </span>
        </button>
      </div>
    </div>
  );
};

export default CategoryChips;