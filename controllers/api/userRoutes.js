//Routes to process user data
const router = require('express').Router();
const { User } = require('../../models');

// Create new user
router.post('/', async (req, res) => {
    try {
        const dbUserData = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          adminStatus: false
        });



        // Session set up
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.currentUserId = dbUserData.dataValues.id;
            res.status(200).json(dbUserData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Login process
router.post('/login', async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            where: {
              email: req.body.email,
            },
        });

        if (!dbUserData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password!' });
            return;
        }

        const validPassword = await dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password!' });
            return;
        }

        // Session set up
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.currentUserId = dbUserData.dataValues.id;
            req.session.isAdmin = dbUserData.dataValues.adminStatus;
            res
                .status(200)
                .json({ user: dbUserData, message: 'You are logged in!' });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;