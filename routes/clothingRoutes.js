const router = require('express').Router();
const { Clothing } = require('../models');

// PATH to get elements by id
router.get('/clothing/:id', async (req, res) => {
    try {
        // in this case using PK (primary key "ID")
        const clothingData = await Clothing.findByPk(req.params.id);
        if (!clothingData) {
            res.status(404).json({ message: 'No clothing item found with this id!' });
            return;
        }

        const clothing = clothingData.get({ plain: true });

        res.render('clothing', {
            title: clothing.designName,
            siteName: 'DEADXFACES',
            clothing
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;