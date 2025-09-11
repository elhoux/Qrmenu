const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.DECIMAL(2, 1),
    allowNull: true,
    defaultValue: 0,
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  protein: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  carbs: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  fat: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  fiber: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  // optional fields for UI details
  prepTime: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  reviewsCount: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  // arrays and JSON data
  ingredients: {
    // Postgres supports ARRAY type
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  allergens: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  sizes: {
    // store array of objects: [{id,name,price,calories}]
    type: DataTypes.JSONB,
    allowNull: true,
  },
  extras: {
    // store array of objects: [{id,name,price}]
    type: DataTypes.JSONB,
    allowNull: true,
  }
}, {
  timestamps: true
});

module.exports = Product;
