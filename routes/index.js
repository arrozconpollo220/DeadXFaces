const router = require('express').Router();
const clothingRoutes = require('./clothingRoutes');
const articleRoutes = require('./articleRoutes');

router.use('/', clothingRoutes);
router.use('/', articleRoutes);

module.exports = router;