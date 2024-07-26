const sequelize = require('../config/connection');
const { User, Clothing, Size, CartItem } = require('../models');

const userData = require('./userData.json');
const clothingData = require('./clothingData.json');
const sizeData = require('./sizeData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const clothing = await Clothing.bulkCreate(clothingData, {
    individualHooks: true,
    returning: true,
  });

  for (const size of sizeData) {
    await Size.create({
      ...size,
      clothing_id: clothing[Math.floor(Math.random() * clothing.length)].id,
    });
  }

  const cartItemData = {
    cartID: 101,
    design: "dirty socks",
    price: 45.00,
    quantity: 2,
    size: "small",
  };

  const cartItem = await CartItem.create(cartItemData);

  process.exit(0);
};

seedDatabase();
