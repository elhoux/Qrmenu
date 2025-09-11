import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export interface ProductLikeData {
  productId: number;
  profileId: number;
}

const productLikeService = {
  async toggleLike(profileId: number, productId: number): Promise<boolean> {
    try {
      const response = await axios.post(`${API_URL}/product-likes/toggle`, {
        profileId,
        productId
      });
      return response.data.liked;
    } catch (error) {
      console.error('Error toggling product like:', error);
      throw error;
    }
  },

  async getLikedProducts(profileId: number): Promise<any[]> {
    try {
      const response = await axios.get(`${API_URL}/product-likes/profile/${profileId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting liked products:', error);
      throw error;
    }
  },

  async isProductLiked(profileId: number, productId: number): Promise<boolean> {
    try {
      const response = await axios.get(`${API_URL}/product-likes/check/${profileId}/${productId}`);
      return response.data.liked;
    } catch (error) {
      console.error('Error checking if product is liked:', error);
      throw error;
    }
  }
};

export default productLikeService;
