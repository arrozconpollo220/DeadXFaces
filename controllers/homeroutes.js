const router = require('express').Router();
const { Clothing, Size } = require('../models');
// const withAuth = require('../utils/auth');

//GET all clothing items for homepage
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
    items,
    loggedIn: req.session.loggedIn,
    currUserId: req.session.currentUserId,
    isAdmin: req.session.isAdmin
  });
});

//Simple navigation routes
router.get('/newitem', async (req, res) => {
  res.render('additem');
});

router.get('/login', async (req, res) => {
  res.render('login');
});

router.get('/signup', async (req, res) => {
  res.render('signup');
});

module.exports = router