import React, { useState, useRef, useEffect } from 'react';
import { FiChevronDown, FiStar, FiFilter } from 'react-icons/fi';

interface FilterOption {
  id: string;
  label: string;
}

interface Filter {
  id: string;
  label: string;
  hasDropdown: boolean;
  isActive?: boolean;
  options?: FilterOption[];
}


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


  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown) {
      setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 100);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  const handleFilterClick = (filterId: string, hasDropdown: boolean) => {
    if (hasDropdown) {
      event?.stopPropagation();
      setOpenDropdown(openDropdown === filterId ? null : filterId);
    } else {
      setActiveFilter(activeFilter === filterId ? null : filterId);
      setOpenDropdown(null);
    }
  };

  const handleOptionSelect = (filterId: string, optionId: string, optionLabel: string) => {
    event?.stopPropagation();
    setSelectedOptions(prev => ({
      ...prev,
      [filterId]: optionLabel
    }));
    setActiveFilter(filterId);
    setOpenDropdown(null);
  };

  const getFilterLabel = (filter: Filter) => {
    if (selectedOptions[filter.id]) {
      return selectedOptions[filter.id];
    }
    return filter.label;
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