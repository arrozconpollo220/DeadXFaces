const router = require('express').Router();
const { Size } = require('../../models');

//Add new clothing size
router.post('/add', async (req, res) => {
    try {
        const dbAddSizeData = await Size.create({
            size_value: req.body.size_value,
            size_name: req.body.size_name,
            clothing_id: req.body.clothing_id,
        });

        res.status(200).json(dbAddSizeData);
        // res.render('../');
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Delete existing clothing size
router.delete('/delete', async (req, res) => {
    try {
        const dbDeleteSizeData = await Size.destroy({
                where: {
                    size_value: req.body.size_value,
                    clothing_id: req.body.clothing_id,
                }
            }
        );

        if (dbDeleteSizeData[0] === 0) { // Check if any rows were updated
            res.status(404).json({ message: 'No sizes found for this clothing item!' });
        } else {
            res.status(200).json(dbDeleteSizeData);
            // res.render('./');
        }

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;