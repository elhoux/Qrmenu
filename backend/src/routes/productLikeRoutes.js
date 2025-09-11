const express = require('express');
const router = express.Router();
const productLikeController = require('../controllers/productLikeController');

// Check if a product is liked by a profile
router.get('/check/:profileId/:productId', productLikeController.isProductLiked);

// Toggle like on/off
router.post('/toggle', productLikeController.toggleLike);

// Get all liked products for a profile
router.get('/profile/:profileId', productLikeController.getLikedProducts);

module.exports = router;
