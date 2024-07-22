const sequelize = require('../config/connection');
const { User, Clothing, Size } = require('../models');

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

  process.exit(0);
};

seedDatabase();
