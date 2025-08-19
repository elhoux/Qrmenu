import React, { useState, useEffect } from 'react';
import { FiArrowLeft, FiStar, FiClock, FiPlus, FiMinus } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';

interface DishSize {
  id: string;
  name: string;
  price: number;
  calories: number;
}

interface Extra {
  id: string;
  name: string;
  price: number;
}

interface NutritionalInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

interface Dish {
  id: string;
  name: string;
  imageUrl: string;
  rating: number;
  reviewsCount: number;
  prepTime: string;
  description: string;
  ingredients: string[];
  allergens: string[];
  sizes: DishSize[];
  extras: Extra[];
  nutritionalInfo: NutritionalInfo;
}

const DishDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'ingredients' | 'allergens'>('description');
  const [nutritionTab, setNutritionTab] = useState<'portion' | '100g'>('portion');

  // Mock data - en production, cela viendrait d'une API
  const dish: Dish = {
    id: '1',
    name: 'Mixed Salad Bowl',
    imageUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    reviewsCount: 124,
    prepTime: '15 min',
    description: 'Une salade fraîche et colorée composée de légumes de saison, accompagnée de notre vinaigrette maison. Parfaite pour un repas léger et nutritif.',
    ingredients: ['Salade verte', 'Tomates cerises', 'Concombre', 'Avocat', 'Feta', 'Olives noires', 'Vinaigrette maison'],
    allergens: ['Lait (feta)', 'Peut contenir des traces de noix'],
    sizes: [
      { id: 'small', name: 'Petit', price: 8.50, calories: 280 },
      { id: 'medium', name: 'Moyen', price: 11.50, calories: 420 },
      { id: 'large', name: 'Grand', price: 14.50, calories: 560 }
    ],
    extras: [
      { id: 'extra-cheese', name: 'Extra fromage', price: 2.00 },
      { id: 'extra-avocado', name: 'Extra avocat', price: 2.50 },
      { id: 'grilled-chicken', name: 'Poulet grillé', price: 4.00 },
      { id: 'drink', name: 'Boisson', price: 3.00 }
    ],
    nutritionalInfo: {
      calories: 420,
      protein: 18,
      carbs: 25,
      fat: 28,
      fiber: 12
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleSizeSelect = (sizeId: string) => {
    setSelectedSize(sizeId);
  };

  const handleExtraToggle = (extraId: string) => {
    setSelectedExtras(prev => 
      prev.includes(extraId) 
        ? prev.filter(id => id !== extraId)
        : [...prev, extraId]
    );
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const calculateTotal = () => {
    const selectedSizeObj = dish.sizes.find(size => size.id === selectedSize);
    const sizePrice = selectedSizeObj?.price || 0;
    const extrasPrice = selectedExtras.reduce((total, extraId) => {
      const extra = dish.extras.find(e => e.id === extraId);
      return total + (extra?.price || 0);
    }, 0);
    return (sizePrice + extrasPrice) * quantity;
  };

  const handleAddToCart = () => {
    if (!selectedSize) return;
    
    // Ici on ajouterait la logique pour ajouter au panier
    console.log('Ajout au panier:', {
      dish: dish.id,
      size: selectedSize,
      extras: selectedExtras,
      quantity,
      total: calculateTotal()
    });
    
    // Animation de succès ou navigation
    navigate('/cart');
  };

  const getPriceRange = () => {
    const prices = dish.sizes.map(size => size.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return min === max ? `$${min.toFixed(2)}` : `$${min.toFixed(2)} - $${max.toFixed(2)}`;
  };

  const getSelectedSizeCalories = () => {
    const selectedSizeObj = dish.sizes.find(size => size.id === selectedSize);
    return selectedSizeObj?.calories || dish.nutritionalInfo.calories;
  };

  const CircularProgress = ({ value, max, label, color = 'primary' }: { value: number; max: number; label: string; color?: string }) => {
    const percentage = (value / max) * 100;
    const circumference = 2 * Math.PI * 20;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="flex flex-col items-center">
        <div className="relative w-16 h-16">
          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 44 44">
            <circle
              cx="22"
              cy="22"
              r="20"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              className="text-gray-200"
            />
            <circle
              cx="22"
              cy="22"
              r="20"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className={`text-${color} transition-all duration-1000 ease-out`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-semibold text-text-primary">{value}g</span>
          </div>
        </div>
        <span className="text-xs text-text-secondary mt-1">{label}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Image */}
      <div className="relative">
        <img
          src={dish.imageUrl}
          alt={dish.name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors z-10"
        >
          <FiArrowLeft size={24} className="text-text-primary" />
        </button>
      </div>

      <div className="max-w-mobile mx-auto px-4 pb-32">
        {/* Title, Price & Info Badges */}
        <div className="bg-white rounded-t-3xl -mt-6 relative z-10 pt-6 px-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-text-primary mb-1">{dish.name}</h1>
              <p className="text-sm text-text-secondary">Prix selon la taille</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-primary">{getPriceRange()}</span>
            </div>
          </div>

          {/* Info Badges */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1 bg-accent/10 px-3 py-1.5 rounded-full">
              <FiStar size={14} className="text-accent fill-current" />
              <span className="text-sm font-medium text-text-primary">{dish.rating}</span>
              <span className="text-xs text-text-secondary">({dish.reviewsCount})</span>
            </div>
            <div className="flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-full">
              <FiClock size={14} className="text-blue-600" />
              <span className="text-sm font-medium text-text-primary">{dish.prepTime}</span>
            </div>
            <div className="flex items-center gap-1 bg-orange-50 px-3 py-1.5 rounded-full">
              <span className="text-sm">🔥</span>
              <span className="text-sm font-medium text-text-primary">{getSelectedSizeCalories()} cal</span>
            </div>
          </div>
        </div>

        {/* Nutritional Info */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-primary">Valeurs nutritionnelles</h2>
            <div className="flex bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setNutritionTab('portion')}
                className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${
                  nutritionTab === 'portion' 
                    ? 'bg-white text-primary shadow-sm' 
                    : 'text-text-secondary'
                }`}
              >
                Par portion
              </button>
              <button
                onClick={() => setNutritionTab('100g')}
                className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${
                  nutritionTab === '100g' 
                    ? 'bg-white text-primary shadow-sm' 
                    : 'text-text-secondary'
                }`}
              >
                Pour 100g
              </button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-4">
            <CircularProgress value={dish.nutritionalInfo.protein} max={50} label="Protéines" color="primary" />
            <CircularProgress value={dish.nutritionalInfo.carbs} max={100} label="Glucides" color="accent" />
            <CircularProgress value={dish.nutritionalInfo.fat} max={50} label="Lipides" color="orange-500" />
            <CircularProgress value={dish.nutritionalInfo.fiber} max={30} label="Fibres" color="green-500" />
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-text-primary mb-1">
              {dish.nutritionalInfo.calories} calories
            </div>
            <p className="text-xs text-text-secondary">
              Calcul basé sur la préparation standard
            </p>
          </div>
        </div>

        {/* Description Tabs */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <div className="flex border-b border-gray-100 mb-4">
            {[
              { key: 'description', label: 'Description' },
              { key: 'ingredients', label: 'Ingrédients' },
              { key: 'allergens', label: 'Allergènes' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
                  activeTab === tab.key 
                    ? 'text-primary' 
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"></div>
                )}
              </button>
            ))}
          </div>

          <div className="min-h-[80px]">
            {activeTab === 'description' && (
              <p className="text-text-secondary leading-relaxed">{dish.description}</p>
            )}
            {activeTab === 'ingredients' && (
              <ul className="space-y-2">
                {dish.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center gap-2 text-text-secondary">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    {ingredient}
                  </li>
                ))}
              </ul>
            )}
            {activeTab === 'allergens' && (
              <ul className="space-y-2">
                {dish.allergens.map((allergen, index) => (
                  <li key={index} className="flex items-center gap-2 text-text-secondary">
                    <span className="text-orange-500">⚠️</span>
                    {allergen}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Size Selection */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Choisir la taille</h2>
          <div className="grid grid-cols-3 gap-3">
            {dish.sizes.map((size) => (
              <button
                key={size.id}
                onClick={() => handleSizeSelect(size.id)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedSize === size.id
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className={`font-medium mb-1 ${
                    selectedSize === size.id ? 'text-primary' : 'text-text-primary'
                  }`}>
                    {size.name}
                  </div>
                  <div className={`text-sm font-semibold ${
                    selectedSize === size.id ? 'text-primary' : 'text-text-secondary'
                  }`}>
                    ${size.price.toFixed(2)}
                  </div>
                  <div className="text-xs text-text-secondary mt-1">
                    {size.calories} cal
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Extras */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Extras</h2>
          <div className="space-y-3">
            {dish.extras.map((extra) => (
              <label
                key={extra.id}
                className="flex items-center justify-between p-3 rounded-xl border border-gray-200 hover:border-gray-300 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedExtras.includes(extra.id)}
                    onChange={() => handleExtraToggle(extra.id)}
                    className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2"
                  />
                  <span className="text-text-primary font-medium">{extra.name}</span>
                </div>
                <span className="text-primary font-semibold">+${extra.price.toFixed(2)}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Quantity & Add to Cart */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-primary">Quantité</h2>
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-primary hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiMinus size={16} />
              </button>
              <span className="text-xl font-semibold text-text-primary w-8 text-center">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
              >
                <FiPlus size={16} />
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!selectedSize}
            className="w-full py-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            <span>Ajouter au panier</span>
            {selectedSize && (
              <span className="bg-white/20 px-2 py-1 rounded-full text-sm">
                ${calculateTotal().toFixed(2)}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-[env(safe-area-inset-bottom)] z-50">
        <div className="max-w-mobile mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-primary hover:text-primary transition-colors disabled:opacity-50"
              >
                <FiMinus size={14} />
              </button>
              <span className="font-semibold text-text-primary w-6 text-center">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
              >
                <FiPlus size={14} />
              </button>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-primary">
                ${calculateTotal().toFixed(2)}
              </div>
              <div className="text-xs text-text-secondary">Total</div>
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!selectedSize}
            className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
};

export default DishDetailPage;