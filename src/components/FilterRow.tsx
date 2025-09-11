import React from 'react';
import { FiChevronDown, FiFilter } from 'react-icons/fi';

export type SortOption = 'Default' | 'Price: Low to High' | 'Price: High to Low' | 'Rating: High to Low' | 'Name A-Z';

interface FilterRowProps {
  sortBy: SortOption;
  onSortChange: (next: SortOption) => void;
  topRatedOnly: boolean;
  onToggleTopRated: () => void;
  onFoodTypeClick?: () => void;
}

const sortCycle: SortOption[] = ['Default', 'Price: Low to High', 'Price: High to Low', 'Rating: High to Low', 'Name A-Z'];

const FilterRow: React.FC<FilterRowProps> = ({ sortBy, onSortChange, topRatedOnly, onToggleTopRated, onFoodTypeClick }) => {
  const handleSortClick = () => {
    const idx = sortCycle.indexOf(sortBy);
    const next = sortCycle[(idx + 1) % sortCycle.length];
    onSortChange(next);
  };

  return (
    <div className="flex gap-3 mb-6 overflow-x-auto scrollbar-hide">
      <button
        onClick={onFoodTypeClick}
        className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 hover:border-primary hover:bg-gray-50 transition-colors"
      >
        <FiFilter size={16} className="text-text-secondary" />
        <span className="text-sm text-text-secondary whitespace-nowrap">Food type</span>
      </button>

      <button
        onClick={handleSortClick}
        className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 hover:border-primary hover:bg-gray-50 transition-colors"
      >
        <FiChevronDown size={16} className="text-text-secondary" />
        <span className="text-sm text-text-secondary whitespace-nowrap">{sortBy}</span>
      </button>

      <button
        onClick={onToggleTopRated}
        className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
          topRatedOnly ? 'bg-emerald-50 border-primary text-primary' : 'bg-white border-gray-200 hover:border-primary hover:bg-gray-50 text-text-secondary'
        }`}
      >
        <FiChevronDown size={16} className="text-current" />
        <span className="text-sm whitespace-nowrap">Top rated</span>
      </button>
    </div>
  );
};

export default FilterRow;