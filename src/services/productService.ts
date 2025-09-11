import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export interface DishSize {
  id: string;
  name: string;
  price: number;
  calories: number;
}

export interface Extra {
  id: string;
  name: string;
  price: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  isAvailable: boolean;
  // Nutrition
  protein?: number;
  carbs?: number;
  fat?: number;
  fiber?: number;
  // UI/Details
  prepTime?: string;
  reviewsCount?: number;
  // Lists
  ingredients?: string[];
  allergens?: string[];
  sizes?: DishSize[];
  extras?: Extra[];
}

const productService = {
  async getAllProducts(): Promise<Product[]> {
    try {
      const response = await axios.get(`${API_URL}/products`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  async getProductById(id: number): Promise<Product> {
    try {
      const response = await axios.get(`${API_URL}/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const response = await axios.get(`${API_URL}/products/category/${category}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  }
};

export default productService;
