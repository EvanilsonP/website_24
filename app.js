require('dotenv').config();

const express = require('express');
const app = express();
const PORT = 5000 || process.env.PORT;
const expressLayout = require('express-ejs-layouts');

app.use(express.static('public'));

// Templating engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// Home page / Grabbing the router from main js file in server/routes/main.js
app.use('/', require('./server/routes/main'));

app.listen(PORT, () => console.log(`Up and running on PORT ${PORT}`));