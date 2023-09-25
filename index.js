require('dotenv').config();
const express = require('express');
const expressLayout = require('express-ejs-layouts');
const bodyParser = require('body-parser');

// 
const app = express();
const PORT = 5000 || process.env.PORT;

// All the css, js and assets files goes here
app.use(express.static('public'));

// Templating engine
app.use(expressLayout);
app.set('layout', './layout/main');
app.set('view engine', 'ejs');

// 
app.use(bodyParser.urlencoded({extended: true}));

// 
app.use('/', require('./server/routes/main'));

// Listening to port 5000
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
})


