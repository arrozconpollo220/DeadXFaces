const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create Clothing model and datatypes
class Clothing extends Model {}

Clothing.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    designName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      precision: 10,
      scale: 2
    },
    image_loc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cart_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'cartItem',
        key: 'cartID',
      },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
},
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'clothing',
  }
);

module.exports = Clothing;
