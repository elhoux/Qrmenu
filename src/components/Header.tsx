import React from 'react';
import { FiBell } from 'react-icons/fi';

const Header = () => {
  return (
    <header className="flex items-center justify-between mb-6">
      <div className="flex-1">
        <h1 className="text-xl font-semibold text-text-primary leading-tight">
          Order Your Favorite<br />
          Fast Food!
        </h1>
      </div>
      <div className="relative">
        <button className="p-2 rounded-full bg-surface shadow-sm hover:shadow-md transition-shadow">
          <FiBell size={20} className="text-text-secondary" />
        </button>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></div>
      </div>
    </header>
  );
};

export default Header;