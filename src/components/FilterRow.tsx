import React from 'react';
import { FiChevronDown, FiFilter } from 'react-icons/fi';

const FilterRow = () => {
  const filters = [
    { id: 'food-type', label: 'Food type', icon: FiFilter },
    { id: 'sort-by', label: 'Sort by', icon: FiChevronDown },
    { id: 'top-rated', label: 'Top rated', icon: FiChevronDown },
  ];

  return (
    <div className="flex gap-3 mb-6 overflow-x-auto scrollbar-hide">
      {filters.map((filter) => (
        <button
          key={filter.id}
          className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 hover:border-primary hover:bg-gray-50 transition-colors"
        >
          <filter.icon size={16} className="text-text-secondary" />
          <span className="text-sm text-text-secondary whitespace-nowrap">
            {filter.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default FilterRow;