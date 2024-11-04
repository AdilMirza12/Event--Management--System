const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User'); // Ensure User is imported correctly

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:""
    },
    userId: {
        type: DataTypes.INTEGER,
        field: 'vendor_id',
        references: {
            model: User, // Make sure User is defined before this line
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
}, {
    tableName: 'products',
    timestamps: false,
});

// Define associations
Product.belongsTo(User, {
    foreignKey: 'userId',
    as: 'vendor',
});

module.exports = Product;
