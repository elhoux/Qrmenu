import React, { useState, useEffect } from 'react';
import { FiGrid, FiList } from 'react-icons/fi';
import RestaurantCard from './RestaurantCard';
import productService, { Product } from '../services/productService';
import { useNavigate } from 'react-router-dom';

const RestaurantList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getAllProducts();
        setProducts(data);
      } catch (err) {
        console.error('Error loading products:', err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div>
      {/* View Mode Toggle */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-text-primary">Restaurants</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'list' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
            aria-label="List view"
          >
            <FiList size={18} />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'grid' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
            aria-label="Grid view"
          >
            <FiGrid size={18} />
          </button>
        </div>
      </div>

      {loading && (
        <div className="text-center py-4">Loading products...</div>
      )}
      
      {error && (
        <div className="text-center py-4 text-red-500">{error}</div>
      )}

      {!loading && !error && (
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-2 gap-3' 
            : 'space-y-3'
        }>
          {products.map((product) => (
            <RestaurantCard
              key={product.id}
              productId={product.id}
              profileId={1}
              name={product.name}
              image={product.image}
              rating={product.rating}
              price={product.price}
              distance=""
              deliveryTime=""
              category={product.category}
              onClick={() => navigate(`/product/${product.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantList;