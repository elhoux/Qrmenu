import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import RestaurantPage from './pages/RestaurantPage';
import RestaurantInfoPage from './pages/RestaurantInfoPage';
import ProfilePage from './pages/ProfilePage';
import MoreCategoryPage from './pages/MoreCategoryPage';
import SpecialOffersPage from './pages/SpecialOffersPage';
import DishDetailPage from './pages/DishDetailPage';
import ProfileFormPage from './pages/ProfileFormPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/restaurants" element={<RestaurantPage />} />
          <Route path="/restaurant/:id" element={<RestaurantInfoPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/more-category" element={<MoreCategoryPage />} />
          <Route path="/special-offers" element={<SpecialOffersPage />} />
          <Route path="/dish/:id" element={<DishDetailPage />} />
          <Route path="/product/:id" element={<DishDetailPage />} />
          <Route path="/profile/edit" element={<ProfileFormPage />} />
        </Routes>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;