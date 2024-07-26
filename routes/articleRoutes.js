const Clothing = require('../models/Clothing');
const Size = require('../models/Size');

async function getClothingDetails(req, res) {
    try {
        const itemId = req.params.id;


        const clothingItem = await Clothing.findByPk(itemId, {
            include: [
                {
                    model: Size,
                    as: 'size' 
                }
            ]
        });

        if (!clothingItem) {
            return res.status(404).send('Item not found');
        }

        
        res.render('onearticle', {
            singleItem: clothingItem,
            isAdmin: req.user && req.user.isAdmin 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = { getClothingDetails };
