const ProductLike = require('../models/productLikeModel');
const Product = require('../models/productModel');

exports.toggleLike = async (req, res) => {
  try {
    const { profileId, productId } = req.body;

    // Check if the like already exists
    const existingLike = await ProductLike.findOne({
      where: { profileId, productId }
    });

    if (existingLike) {
      // Unlike
      await existingLike.destroy();
      res.json({ liked: false });
    } else {
      // Like
      await ProductLike.create({ profileId, productId });
      res.json({ liked: true });
    }
  } catch (error) {
    console.error('Error toggling product like:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getLikedProducts = async (req, res) => {
  try {
    const { profileId } = req.params;

    const likedProducts = await Product.findAll({
      include: [{
        model: ProductLike,
        where: { profileId },
        attributes: []
      }]
    });

    res.json(likedProducts);
  } catch (error) {
    console.error('Error getting liked products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.isProductLiked = async (req, res) => {
  try {
    const { profileId, productId } = req.params;

    const like = await ProductLike.findOne({
      where: { profileId, productId }
    });

    res.json({ liked: !!like });
  } catch (error) {
    console.error('Error checking if product is liked:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
