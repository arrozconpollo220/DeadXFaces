const router = require('express').Router();
const { Clothing } = require('../../models');

//Add new clothing item
router.post('/add', async (req, res) => {
    try {
        const dbAddItemData = await Clothing.create({
            type: req.body.type,
            designName: req.body.designName,
            color: req.body.color,
            price: req.body.price,
            image_loc: "/images/ComingSoon.png"
        });

        res.status(200).json(dbAddItemData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Update existing clothing item
router.put('/u', async (req, res) => {
    try {
        const dbUpdateItemData = await Clothing.update({
            type: req.body.type,
            designName: req.body.designName,
            color: req.body.color,
            price: req.body.price
        },
            {
                where: {
                    id: req.body.item_id
                }
            }
        );

        if (dbUpdateItemData[0] === 0) { // Check if any rows were updated
            res.status(404).json({ message: 'No clothing item found with this id!' });
        } else {
            res.status(200).json(dbUpdateItemData);
        }

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//updates the image location
router.put('/img', async (req, res) => {
    try {
        const dbUpdateImgData = await Clothing.update({
            image_loc: req.body.image_loc,
        },
            {
                where: {
                    id: req.body.item_id
                }
            }
        );

        if (dbUpdateImgData[0] === 0) { // Check if any rows were updated
            res.status(404).json({ message: 'No clothing item found with this id!' });
        } else {
            res.status(200).json(dbUpdateImgData);
        }

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Delete existing clothing item
router.delete('/d/:id', async (req, res) => {
    try {
        const dbDeleteItemData = await Clothing.destroy({
                where: {
                    id: req.params.id
                }
            }
        );

        if (dbDeleteItemData[0] === 0) { // Check if any rows were updated
            res.status(404).json({ message: 'No clothing item found with this id!' });
        } else {
            res.status(200).json(dbDeleteItemData);
        }

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;