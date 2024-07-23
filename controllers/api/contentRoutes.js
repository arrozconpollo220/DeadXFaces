const router = require('express').Router();
const { Clothing } = require('../../models');

router.post('/add', async (req, res) => {
    try {
        const dbAddData = await Clothing.create({
            type: req.body.type,
            designName: req.body.designName,
            color: req.body.color,
            price: req.body.price,
            image_loc: req.body.image_loc
        });

        res.status(200).json(dbAddData);
        res.render('../');
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;