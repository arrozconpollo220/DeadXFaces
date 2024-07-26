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
    clothing_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'cartItem',
  }
);

module.exports = CartItem;
