const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create cartItem model and datatypes, including the clothing_id foreign key.
class CartItem extends Model {}

CartItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    cartID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    design: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subtotal: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'cartItem',
    hooks: {
      beforeCreate: (cartItem) => {
        cartItem.subtotal = cartItem.price * cartItem.quantity;
      },
      beforeUpdate: (cartItem) => {
        cartItem.subtotal = cartItem.price * cartItem.quantity;
      }
    }
  }
);

module.exports = CartItem;
