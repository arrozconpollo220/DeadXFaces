const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const fileUpload = require('express-fileupload');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { Clothing } = require('./models');
require('dotenv').config();
const stripe = require('stripe')('sk_test_51Pe79KBKnwn5pg2W3bH8I3nx7GowQ0xQApvGKZofAgI9qLA8oM97biJQNiy0WwTnimb7We4md8TbRuU3Ps77MHzb004hJEx9Ik');

const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

const { CartItem } = require('./models');

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


const YOUR_DOMAIN = 'http://localhost:3001';
// Stripe checkout
app.get('/checkout/:total', async (req, res) => {
  // const line_items = cart data base? or local storage?
  //Push
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price_data: {
          currency: "USD",
          unit_amount: req.params.total*100,
          product_data: {
            name: "DeadXFaces Order", 
            description: "Your order from DeadXFaces",
          }
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success`,
    cancel_url: `${YOUR_DOMAIN}`,
  });

 res.redirect(303, session.url)
});

app.get('/session-status', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  res.send({
    status: session.status,
    customer_email: session.customer_details.email
  });
});

app.use(routes);

// Agrega la ruta para renderizar la página del carrito
app.get('/cart', async (req, res) => {
  try {
    const cartItems = await CartItem.findAll({
      where: {
        cart_id: req.session.currentCartId,
      }
    });

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const total = subtotal; // Aquí puedes incluir lógica adicional para impuestos/gastos si es necesario

    res.render('cart', {
      cartItems: cartItems.map(item => item.get({ plain: true })),
      subtotal,
      total
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
