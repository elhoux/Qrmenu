const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Profile = require('./profileModel');
const Product = require('./productModel');

const ProductLike = sequelize.define('ProductLike', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  profileId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Profile,
      key: 'id'
    }
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: 'id'
    }
  }
}, {
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['profileId', 'productId']
    }
  ]
});

// Define relationships with explicit foreign keys to avoid auto-adding 'ProfileId'/'ProductId'
Profile.belongsToMany(Product, {
  through: ProductLike,
  foreignKey: 'profileId',
  otherKey: 'productId'
});
Product.belongsToMany(Profile, {
  through: ProductLike,
  foreignKey: 'productId',
  otherKey: 'profileId'
});

module.exports = ProductLike;
