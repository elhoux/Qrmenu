const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Profile = sequelize.define('Profile', {
  name: { type: DataTypes.STRING, allowNull: false },
  username: { type: DataTypes.STRING, unique: true, allowNull: false },
  points: { type: DataTypes.INTEGER, defaultValue: 0 },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  phone: { type: DataTypes.STRING },
  dateOfBirth: { type: DataTypes.DATE },
  gender: { type: DataTypes.ENUM('Male', 'Female', 'Other') },
  profileImage: { type: DataTypes.STRING, allowNull: true }
}, {
  tableName: 'profiles',
  timestamps: true
});

module.exports = Profile;