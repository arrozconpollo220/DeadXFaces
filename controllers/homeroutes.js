const router = require('express').Router();
const { Clothing, Size } = require('../models');
// const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    const clothingData = await Clothing.findAll({
      include: [
        {
          model: Size,
          attributes: ['size']
        },
      ]
    }).catch((err) => {
      res.json(err);
    });
    const items = clothingData.map((item) => item.get({ plain: true }));
    res.render('homepage', {
      items
    });
  });

  router.get('/newitem', async (req, res) => {
    res.render('additem');
  });

module.exports = router