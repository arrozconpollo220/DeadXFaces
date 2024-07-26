const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const fileUpload = require('express-fileupload');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { Clothing } = require('./models');
require('dotenv').config();

const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: process.env.SECRET,
  cookie: {
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(fileUpload());

const uploadDir = path.join(__dirname, 'public/images');
app.post('/upload', async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field ("imgFile") is used to retrieve the uploaded file
  let imgFile = req.files.imgFile;
  let filePath = path.join(uploadDir, imgFile.name);
  let itemId = req.body.itemId;

  // Use the mv() method to place the file somewhere on your server
  try {
    await imgFile.mv(filePath);

    // Update file information in the database
    let item = await Clothing.findByPk(itemId);
    if (item) {
      await item.update({
        image_loc: `/images/${imgFile.name}`,
      });
      res.redirect(`/update/${itemId}`);
    } else {
      res.status(404).send('Item not found');
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});