import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiShoppingCart, FiMapPin, FiUser } from 'react-icons/fi';

const BottomNav = () => {
  const navItems = [
    { path: '/', icon: FiHome, label: 'Menu' },
    { path: '/cart', icon: FiShoppingCart, label: 'Panier' },
    { path: '/restaurants', icon: FiMapPin, label: 'Restaurants' },
    { path: '/profile', icon: FiUser, label: 'Profil' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg rounded-t-3xl pb-[env(safe-area-inset-bottom)] z-50 border-t border-gray-100">
      <div className="max-w-mobile mx-auto px-6 py-3">
        <div className="flex justify-around items-center">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center py-2 px-4 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'text-primary bg-emerald-50'
                    : 'text-text-secondary hover:text-text-primary'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon 
                    size={24} 
                    className={`mb-1 ${isActive ? 'text-primary' : 'text-text-secondary'}`} 
                  />
                  <span className={`text-xs font-medium ${isActive ? 'text-primary' : 'text-text-secondary'}`}>
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;