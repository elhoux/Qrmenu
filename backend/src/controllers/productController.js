const Product = require('../models/productModel');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            order: [['createdAt', 'DESC']]
        });
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getProductsByCategory = async (req, res) => {
    try {
        const products = await Product.findAll({
            where: {
                category: req.params.category
            }
        });
        res.json(products);
    } catch (error) {
        console.error('Error fetching products by category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const data = req.body;
        const product = await Product.create({
            name: data.name,
            description: data.description,
            price: data.price,
            image: data.image,
            category: data.category,
            rating: data.rating,
            isAvailable: data.isAvailable,
            protein: data.protein,
            carbs: data.carbs,
            fat: data.fat,
            fiber: data.fiber,
            prepTime: data.prepTime,
            reviewsCount: data.reviewsCount,
            ingredients: data.ingredients,
            allergens: data.allergens,
            sizes: data.sizes,
            extras: data.extras,
        });
        res.status(201).json(product);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update an existing product
exports.updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        const data = req.body;
        await product.update({
            name: data.name,
            description: data.description,
            price: data.price,
            image: data.image,
            category: data.category,
            rating: data.rating,
            isAvailable: data.isAvailable,
            protein: data.protein,
            carbs: data.carbs,
            fat: data.fat,
            fiber: data.fiber,
            prepTime: data.prepTime,
            reviewsCount: data.reviewsCount,
            ingredients: data.ingredients,
            allergens: data.allergens,
            sizes: data.sizes,
            extras: data.extras,
        });
        res.json(product);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
