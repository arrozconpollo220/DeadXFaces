const User = require('./User');
const Clothing = require('./Clothing');
const Size = require('./Size');
const CartItem = require('./cartItem');

// // Creates a relationship between Clothing and Size models.
Clothing.hasMany(Size, {
  foreignKey: 'clothing_id',
  onDelete: 'CASCADE',
});

Size.belongsTo(Clothing, {
  foreignKey: 'clothing_id',
});

module.exports = {
  User,
  Clothing,
  Size,
  CartItem
};
