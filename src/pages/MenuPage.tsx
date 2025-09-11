import React, { useState } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import SectionHeader from '../components/SectionHeader';
import PromoBanner from '../components/PromoBanner';
import DiscountCarousel from '../components/DiscountCarousel';
import CategoryChips from '../components/CategoryChips';
import FilterRow, { SortOption } from '../components/FilterRow';
import RestaurantList from '../components/RestaurantList';
import { useNavigate } from 'react-router-dom';

const MenuPage = () => {
  const navigate = useNavigate();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('1');
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>('Promotions');
  const [sortBy, setSortBy] = useState<SortOption>('Default');
  const [topRatedOnly, setTopRatedOnly] = useState<boolean>(false);

  const handleSpecialOffersSeeAll = () => {
    navigate('/special-offers');
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-mobile mx-auto px-4 pt-12">
        <Header />
        <SearchBar />
        
        <SectionHeader 
          title="Special Offers" 
          onSeeAllClick={handleSpecialOffersSeeAll}
        />
        <PromoBanner />
        
        <SectionHeader title="Discount Guaranteed! 👆" />
        <DiscountCarousel />
        
        <CategoryChips 
          activeId={selectedCategoryId}
          onChange={(id, name) => {
            setSelectedCategoryId(id);
            setSelectedCategoryName(name);
          }}
        />
        <FilterRow 
          sortBy={sortBy}
          onSortChange={setSortBy}
          topRatedOnly={topRatedOnly}
          onToggleTopRated={() => setTopRatedOnly((v) => !v)}
        />
        
        <RestaurantList 
          selectedCategoryName={selectedCategoryName}
          sortBy={sortBy}
          topRatedOnly={topRatedOnly}
        />
      </div>
    </div>
  );
};

export default MenuPage;