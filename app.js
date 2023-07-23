//require express to use express app
const express = require('express');
//require express-session to use PRG(Post Redirect Get) technique
const session = require('express-session');
//rerquire cookie parser to add cookies
const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');

//include mysql12
const mysql = require('mysql2');
//nodemailer
const nodemailer = require('nodemailer');
//axios to require http requests
const axios = require('axios');
//require lodash for js helper functions
const { result } = require('lodash');

//require mogan for middlewares
const morgan = require('morgan');

//using cors middleware
const cors = require('cors');
const { Connection } = require('mysql2');

const app = express();

// function generateRandomNumbers()
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

app.set('view engine', 'ejs');  //setup view engine and ejs templating
app.set('views', 'views'); // views is the folder to get the ejs fils

//create db instance
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'thabiso.leboko',
    database: 'dr_elecro_new'
});

//connect to a db
connection.connect(err => {
    if(err) console.log(err);
    console.log('connected');
})

//allow for getting only single data from the form
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
//use the following files and libraries
app.use(express.static('css'));
app.use(express.static('js'))
app.use(express.static('resources'));
//allow for fetching data from backend
app.use(cors());
app.use(morgan('dev'));
// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

//listening port
app.listen(5000);

//LOGIN AND SIGNUP MIDDLEWARE
let passedLoginTest = false;
function requireLogin(req, res, next){
  if(passedLoginTest){
    next();
  }
  else {
    res.redirect('/main-login')
  }
}

//render home page before login in
app.get('/', (req, res) => {
    let sql = `SELECT item_id,item_name, item_description, item_price 
               FROM item`;
    connection.query(sql, (err, results) => {
      if (err){ console.log(err)}
      passedLoginTest = false;
      res.render('index', {results});
    })
    
});

//render login from home page
  app.get('/login', (req, res) => {
    res.render('login');
  });
  
  //render sign in from login page
  app.get('/sign-in', (req, res) => {
    res.render('signin');
  });
  
  //user sign up
  app.post('/signup', (req, res) => {
    const {customer_name, customer_gmail, customer_password, customer_confirm_password} = req.body;
    // customer_id, 
    let sql = `
    INSERT INTO customer 
     (customer_id, customer_name, customer_gmail, customer_password, customer_confirm_password)
     values (DEFAULT, ?, ?, ?, ?);`;
    const values = [customer_name, customer_gmail, customer_password, customer_confirm_password];
    connection.query(sql, values, (err, results) => {
        if(err){ console.log(err); }
        else {
          req.session.sesID = results;
          req.session.cus_id = results[0].customer_id;
          // sendMail(user_gmail);
          passedLoginTest = true;
           res.redirect('/logged');}
    });
  });

  function sendMail(email){
    //create mail transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mphoshabalala3401@gmail.com',
  
      }
    });

    const options = {
      from: 'mphoshabalala3401@gmail.com',
      to: email,
      subject: 'Welcome to DR. Elecro',
      text: `Thank you for signing up`
    }

    //send the email
    transporter.sendMail(options, (err, info) => {
      if(err){
        console.log(err)
      } else {
        console.log('Email Sent: '+ info.response)
      }
    });
  }

  //user login
  app.post('/login_auth', (req, res) => {
    const {customer_gmail, customer_password} = req.body;
    const sql = 'SELECT customer_id FROM customer WHERE customer_gmail=? AND customer_password=?';
    connection.query(sql, [customer_gmail, customer_password], (err, results) => {
        if(err) {
          console.log(err);
          return;
        }
        if(results.length > 0){
          req.session.sesID = results;
          req.session.cus_id = results[0].customer_id;
          passedLoginTest = true;
          res.redirect('/logged');
        } else {
          res.redirect('/main-login');
        }
    });
  });

  app.get('/logged', requireLogin, (req, res) => {
    let sql = `SELECT item_id,item_name, item_description, item_price
    FROM item`;
    connection.query(sql, (err, results) => {
      if (err){ console.log(err)}
      res.render('index_logged', {results: results});
    });
  });
 
//handle error and submit to the user screen endpoint
  app.get('/details',requireLogin, (req, res) => {
    const data = {error: 'error happened nigga'};
    res.send(data);
  })

//render stand-alone login page
  app.get('/main-login', (req, res) => {
    res.render('login');
  });

  //render stand-alone signup
  app.get('/main-create-account', (req, res) => {
    res.render('signin');
  });

  //detailed Item
  //implementation of PRG(POST, REDIRECT AND GET)
  app.post('/detailed-item', (req, res) => {
    const {id} = req.body;
    let sql = `SELECT * from item WHERE item_id=?`;
    connection.query(sql, [id], (err, result) => {
      if(err){
        console.log(err);
      }
      req.session.item_results = result;
      req.session.item_id = result[0].item_id;
      console.log(result.item_id);
      res.redirect('/detailed');
      // console.log( result[0].item_id);
      
    });
    // console.log(id);
  });

  app.get('/detailed',requireLogin, (req, res) => {
    const result = req.session.item_results;
      res.render('detailed', {result});
  });

  // this router gets both the customer_id and item_id from the session
  app.get('/detailed/customer_id_and_item_id',requireLogin, (req, res) => {
      const item_id = req.session.item_id;
      const customer_id = req.session.cus_id;
      res.json({item_id, customer_id});
  });

  //post session customer_id and item_id to cart(database)
  app.post('/detailed/customer_id_and_item_id/submit', (req, res) => {
    const { customerID, itemID } = req.body;
    console.log("Data",customerID, itemID);
    const sql = `
      INSERT INTO cart (cart_id, item_id, customer_id)
      VALUES (DEFAULT, ?, ?);
    `;
    connection.query(sql, [itemID,customerID], (err, results) => {
      err ? console.log(err) : console.log(results);
    })
  });

  app.get('/detailed/cart/id',requireLogin, (req, res) => {
    const customer_id = req.session.cus_id;
    let sql = `SELECT COUNT(*) AS cart_count
               FROM cart
               WHERE customer_id=?`;
    connection.query(sql,[customer_id], (err, results) => {
      // const cart_count = results[0].cart_count;
      if(err){
        console.log(err);
      }
      const cart_count = results[0].cart_count;
      req.session.cart = {
        count: cart_count
      };
      res.json(req.session.cart.count);
    });
  });

  // CART
  app.get('/detailed-cart',requireLogin, (req, res) => {
    const customer_id = req.session.cus_id;
    const sql = `SELECT item_name, item_price
    FROM item
    JOIN cart ON item.item_id = cart.item_id 
    WHERE cart.customer_id = ${customer_id};
    `;
    connection.query(sql, (err, results) => {
      if(err) {
        console.log(err);
      }
      console.log(results);
      res.render('cart', {results});
    })
  });

  // ADMIN
  //get administrator page: only for admins: ADMIN AUTHENTICATION TO BE CREATED
  app.get('/admin', (req, res) => {
    let sql = 'SELECT item_id, item_name, item_price, item_description FROM item';
    connection.query(sql, (err, results) => {
      if(err){ console.log(err)
      console.log("or here")}
      else {
        res.render('administration', {results});
        console.log("we here");
      }
    });
  });

  //add item to the database by the admin
  app.post('/additem', (req, res) => {
    const {item_name,  item_description, item_price} = req.body;
    let sql = `
    INSERT INTO item 
     (item_id, item_name, item_price, item_description)
     values (DEFAULT, ?, ?, ?)`;
    const values = [item_name, item_price, item_description];
    connection.query(sql, values, (err, results) => {
        if(err){ console.log("err"); }
        else {
           res.redirect('/admin');}
    });
  });


  //PURCHASES
  app.post('/purchaseItem', (req, res) => {
    const {itemID ,customerID} = req.body;
    console.log("Data",itemID, customerID);
    const sql = `
      INSERT INTO purchase (purchase_id, item_id, customer_id)
      VALUES (DEFAULT, ?, ?);
    `;
    connection.query(sql, [itemID,customerID], (err, results) => {
      err ? console.log(err) : console.log(item_id, customer_id);
    })
  });