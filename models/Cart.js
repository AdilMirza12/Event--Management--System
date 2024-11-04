const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Product = require('./Product');

const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    field: 'user_id',
    references: {
      model: User,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  productId: {
    type: DataTypes.INTEGER,
    field: 'product_id',

    references: {
      model: Product,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
}, {
  timestamps: false,
});

// Associations
User.hasMany(Cart, {
  foreignKey: 'userId',
});
// Product model
Product.hasMany(Cart, { foreignKey: 'productId', as: 'carts' }); // Using 'carts' as the alias

Cart.belongsTo(User, {
  foreignKey: 'userId',
});
// Cart model
Cart.belongsTo(Product, { foreignKey: 'productId', as: 'product' }); // Using 'product' as the alias

module.exports = Cart;
