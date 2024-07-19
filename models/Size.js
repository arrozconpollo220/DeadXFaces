const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create Size model and datatypes, including the clothing_id foreign key.
class Size extends Model {}

Size.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clothing_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'clothing',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'size',
  }
);

module.exports = Size;
