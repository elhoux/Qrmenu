import React, { useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');

  const clearSearch = () => {
    setSearchValue('');
  };

  return (
    <div className="relative mb-6">
      <div className="relative">
        <FiSearch 
          size={20} 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary" 
        />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="What are you craving?"
          className="w-full pl-12 pr-12 py-4 bg-surface rounded-full border-0 shadow-sm focus:ring-2 focus:ring-primary focus:ring-opacity-20 text-sm placeholder-text-secondary"
        />
        {searchValue && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <FiX size={16} className="text-text-secondary" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;