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

const FilterRow = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>('top-rated');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filters: Filter[] = [
    { 
      id: 'top-rated', 
      label: 'Top rated', 
      hasDropdown: false, 
      isActive: true 
    },
    { 
      id: 'sort-by', 
      label: 'Sort by', 
      hasDropdown: true,
      options: [
        { id: 'price', label: 'Prix' },
        { id: 'calories', label: 'Calories' },
        { id: 'rating', label: 'Note' },
        { id: 'delivery-time', label: 'Temps de livraison' },
        { id: 'distance', label: 'Distance' },
        { id: 'popularity', label: 'Popularité' },
        { id: 'newest', label: 'Plus récent' },
        { id: 'offers', label: 'Offres' }
      ]
    },
    { 
      id: 'food-type', 
      label: 'Food type', 
      hasDropdown: true,
      options: [
        { id: 'fast-food', label: 'Fast Food' },
        { id: 'pizza', label: 'Pizza' },
        { id: 'burger', label: 'Burger' },
        { id: 'asian', label: 'Asian' },
        { id: 'italian', label: 'Italian' },
        { id: 'mexican', label: 'Mexican' },
        { id: 'indian', label: 'Indian' },
        { id: 'healthy', label: 'Healthy' },
        { id: 'dessert', label: 'Dessert' },
        { id: 'beverages', label: 'Beverages' }
      ]
    },
    { 
      id: 'price-range', 
      label: 'Price range', 
      hasDropdown: true,
      options: [
        { id: 'budget', label: '$ Budget (Under $10)' },
        { id: 'moderate', label: '$$ Moderate ($10-25)' },
        { id: 'expensive', label: '$$$ Expensive ($25-50)' },
        { id: 'luxury', label: '$$$$ Luxury ($50+)' }
      ]
    },
    { 
      id: 'delivery-time', 
      label: 'Delivery time', 
      hasDropdown: true,
      options: [
        { id: 'asap', label: 'ASAP (10-20 min)' },
        { id: 'fast', label: 'Fast (20-30 min)' },
        { id: 'standard', label: 'Standard (30-45 min)' },
        { id: 'scheduled', label: 'Scheduled' }
      ]
    },
    { 
      id: 'cuisine', 
      label: 'Cuisine', 
      hasDropdown: true,
      options: [
        { id: 'american', label: 'American' },
        { id: 'chinese', label: 'Chinese' },
        { id: 'japanese', label: 'Japanese' },
        { id: 'french', label: 'French' },
        { id: 'thai', label: 'Thai' },
        { id: 'mediterranean', label: 'Mediterranean' },
        { id: 'korean', label: 'Korean' },
        { id: 'vietnamese', label: 'Vietnamese' },
        { id: 'lebanese', label: 'Lebanese' },
        { id: 'greek', label: 'Greek' }
      ]
    },
    { 
      id: 'rating', 
      label: 'Rating', 
      hasDropdown: true,
      options: [
        { id: '4.5+', label: '4.5+ Stars' },
        { id: '4.0+', label: '4.0+ Stars' },
        { id: '3.5+', label: '3.5+ Stars' },
        { id: '3.0+', label: '3.0+ Stars' }
      ]
    },
    { 
      id: 'distance', 
      label: 'Distance', 
      hasDropdown: true,
      options: [
        { id: 'nearby', label: 'Nearby (0-1 km)' },
        { id: 'close', label: 'Close (1-3 km)' },
        { id: 'moderate', label: 'Moderate (3-5 km)' },
        { id: 'far', label: 'Far (5+ km)' }
      ]
    },
    { id: 'offers', label: 'Offers', hasDropdown: false },
    { id: 'vegetarian', label: 'Vegetarian', hasDropdown: false },
    { id: 'fast-delivery', label: 'Fast delivery', hasDropdown: false },
    { id: 'new-restaurants', label: 'New restaurants', hasDropdown: false },
  ];

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
    <div className="mb-6 relative" ref={dropdownRef}>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2" style={{ scrollSnapType: 'x mandatory' }}>
        {filters.map((filter) => (
          <div key={filter.id} className="relative flex-shrink-0" style={{ scrollSnapAlign: 'start' }}>
            <button
              onClick={() => handleFilterClick(filter.id, filter.hasDropdown)}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all duration-200 shadow-sm whitespace-nowrap text-sm font-medium
                ${activeFilter === filter.id || selectedOptions[filter.id]
                  ? 'bg-primary text-white border-primary shadow-md'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:shadow-md'
                }
              `}
            >
              {filter.id === 'top-rated' && (
                <FiStar 
                  size={16} 
                  className={`${activeFilter === filter.id ? 'text-white fill-current' : 'text-accent fill-current'}`} 
                />
              )}
              <span>
                {getFilterLabel(filter)}
              </span>
              {filter.hasDropdown && (
                <FiChevronDown 
                  size={16} 
                  className={`transition-transform duration-200 ${
                    openDropdown === filter.id ? 'rotate-180' : ''
                  } ${activeFilter === filter.id || selectedOptions[filter.id] ? 'text-white' : 'text-gray-500'}`} 
                />
              )}
            </button>

            {/* Dropdown Menu */}
            {filter.hasDropdown && openDropdown === filter.id && filter.options && filter.options.length > 0 && (
              <div 
                className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-lg border border-gray-100 py-3 z-[100] max-h-64 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
                style={{ 
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  backdropFilter: 'blur(8px)'
                }}
              >
                {filter.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={(e) => { e.stopPropagation(); handleOptionSelect(filter.id, option.id, option.label); }}
                    className="w-full text-left px-5 py-3 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-all duration-200 border-none bg-transparent first:rounded-t-xl last:rounded-b-xl"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterRow;