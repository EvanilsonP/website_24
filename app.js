require('dotenv').config();

const express = require('express');
const app = express();
const PORT = 5000 || process.env.PORT;
const expressLayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
const db = require('./database/db.js');
db();

app.use(express.static('public'));

// In order to pass some data in the search button we use this middleware / Be able to pass data thru forms
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI
    }),
    //cookie: { maxAge: new Date ( Date.now() + (3600000) ) } 
}));

// Templating engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// Home page / Grabbing the router from main js file in server/routes/main.js
app.use('/', require('./server/routes/main'));
app.use('/', require('./server/routes/admin'));

app.listen(PORT, () => console.log(`Up and running on PORT ${PORT}`));