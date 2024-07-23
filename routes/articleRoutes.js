const router = require('express').Router();
const { Article } = require('../models');

// Path to get an item by its ID
router.get('/article/:id', async (req, res) => {
    try {
        const articleData = await Article.findByPk(req.params.id);
        if (!articleData) {
            res.status(404).json({ message: 'No article found with this id!' });
            return;
        }

        const article = articleData.get({ plain: true });

        res.render('onearticle', {
            siteName: 'DEADXFACES',
            article,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;