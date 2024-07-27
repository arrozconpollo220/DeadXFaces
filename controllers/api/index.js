const router = require('express').Router();
// Import the routes. This is how we make our routes modular.
const userRoutes = require('./userRoutes');
const contentRoutes = require('./contentRoutes');
const sizeRoutes = require('./sizeRoutes');
const cartRoutes = require('./cartRoutes');

// When a request is made to the /users or /projects path, it will be directed to the index.js in the /users or /projects folder.
router.use('/users', userRoutes);
router.use('/content', contentRoutes);
router.use('/size', sizeRoutes);
router.use('/cart', cartRoutes);

module.exports = router;
