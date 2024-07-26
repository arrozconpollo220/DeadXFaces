const router = require('express').Router();
const { Clothing, Size } = require('../models');

//GET all clothing items for homepage
router.get('/', async (req, res) => {
  const clothingData = await Clothing.findAll({
    attributes: {
      exclude: ['cart_id']
    },
    include: [
      {
        model: Size,
        attributes: ['size_name']
      },
    ],
    order: [
      ['id', 'ASC']
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

// Get selected clothing item
router.get('/singleItem/:id', async (req, res) => {
  const singleItemData = await Clothing.findByPk(req.params.id, {
    attributes: {
      exclude: ['cart_id']
    },
    include: [
      {
        model: Size,
        as: 'sizes',
        attributes: ['size_name']
      }
    ],
    order: [
      [{ model: Size }, 'size_value', 'ASC']
    ]
  }).catch((err) => {
    res.json(err);
  });
  const singleItem = singleItemData.get({ plain: true });
  res.render('onearticle', {
    singleItem,
    loggedIn: req.session.loggedIn,
    currUserId: req.session.currentUserId,
    isAdmin: req.session.isAdmin
  });
});

// Get selected clothing item for updating
router.get('/update/:id', async (req, res) => {
  const singleItemData = await Clothing.findByPk(req.params.id, {
    include: [
      {
        model: Size,
        as: 'sizes',
        attributes: ['size_name']
      }
    ],
    order: [
      [{ model: Size }, 'size_value', 'ASC']
    ]
  }).catch((err) => {
    res.json(err);
  });
  const singleItem = singleItemData.get({ plain: true });

  res.render('updateitem', {
    singleItem,
    loggedIn: req.session.loggedIn,
    currUserId: req.session.currentUserId,
    isAdmin: req.session.isAdmin
  });
});

//Simple navigation routes
router.get('/additem', async (req, res) => {
  res.render('additem', {
    loggedIn: req.session.loggedIn,
    currUserId: req.session.currentUserId,
    isAdmin: req.session.isAdmin
  });
});

router.get('/login', async (req, res) => {
  res.render('login');
});

router.get('/signup', async (req, res) => {
  res.render('signup');
});

module.exports = router