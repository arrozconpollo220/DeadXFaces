const router = require('express').Router();
const { CartItem } = require('../../models');

//Add new item to cart
router.post('/add', async (req, res) => {
    try {
        const dbAddCartData = await CartItem.create({
            cart_id: req.session.currentCartId,
            design: req.body.design,
            size: req.body.size,
            price: req.body.price,
            quantity: req.body.quantity,
        });

        const cartTotal = await CartItem.sum('subtotal', {
            where: {
                cart_id: req.session.currentCartId,
            }
        }
        );

        req.session.cartTotal = cartTotal;

        res.status(200).json(dbAddCartData);
        res.render('../');
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//Update item within cart
router.put('/update', async (req, res) => {
    try {
        const dbUpdateCartData = await CartItem.update({
            size: req.body.size,
            quantity: req.body.quantity,
        },
            {
                where: {
                    id: req.body.id,
                }
            }
        );

        if (dbUpdateCartData[0] === 0) { // Check if any rows were updated
            res.status(404).json({ message: 'No item found in the cart with this id!' });
        } else {

            const cartTotal = await CartItem.sum('subtotal', {
                where: {
                    cart_id: req.session.currentCartId,
                }
            });

            req.session.cartTotal = cartTotal;

            res.status(200).json(dbUpdateCartData);
        }

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Delete existing cart item
router.delete('/delete/:id', async (req, res) => {
    try {
        const dbDeleteCartData = await CartItem.destroy({
            where: {
                id: req.params.id
            }
        }
        );

        if (dbDeleteCartData[0] === 0) { // Check if any rows were updated
            res.status(404).json({ message: 'No item found in the cart with this id!' });
        } else {
            res.status(200).json(dbDeleteCartData);
        }

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


module.exports = router;