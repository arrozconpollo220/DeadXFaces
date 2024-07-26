const router = require('express').Router();
const { CartItem } = require('../../models');

//Add new clothing item
router.post('/add', async (req, res) => {
    try {
        const dbAddCartData = await CartItem.create({
            cartID: req.body.cartID,
            design: req.body.design,
            size: req.body.size,
            price: req.body.price,
            quantity: req.body.quantity,
        });

        res.status(200).json(dbAddCartData);
        res.render('../');
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;