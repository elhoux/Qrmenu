import React, { useState, useEffect } from 'react';
import { FiHeart } from 'react-icons/fi';
import productLikeService from '../services/productLikeService';

interface LikeButtonProps {
  productId: number;
  profileId: number;
  initialLiked?: boolean;
}

const LikeButton: React.FC<LikeButtonProps> = ({ productId, profileId, initialLiked = false }) => {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkLikeStatus = async () => {
      try {
        const liked = await productLikeService.isProductLiked(profileId, productId);
        setIsLiked(liked);
      } catch (error) {
        console.error('Error checking like status:', error);
      }
    };

    checkLikeStatus();
  }, [productId, profileId]);

  const handleToggleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent card click navigation
    e.preventDefault();
    e.stopPropagation();
    if (isLoading) return;

    try {
      setIsLoading(true);
      const liked = await productLikeService.toggleLike(profileId, productId);
      setIsLiked(liked);
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggleLike}
      disabled={isLoading}
      className={`p-2 rounded-full transition-colors duration-200 ${
        isLiked ? 'text-red-500' : 'text-gray-500'
      } ${isLoading ? 'opacity-50' : 'hover:bg-gray-100'}`}
      aria-label={isLiked ? 'Unlike product' : 'Like product'}
      aria-pressed={isLiked}
    >
      <FiHeart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
    </button>
  );
};

export default LikeButton;
