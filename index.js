require('dotenv').config();
const express = require('express');
const expressLayout = require('express-ejs-layouts');
const bodyParser = require('body-parser');

// 
const app = express();
const PORT = 5000 || process.env.PORT;

// All the css, js and assets files goes here
app.use(express.static('public'));
// Above line is middleware, so this line should be above all your request handlers.

// Templating engine
app.use(expressLayout);
app.set("views", path.join(__dirname, "views"));
app.set('layout', './views/layout/main');
app.set('view engine', 'ejs');

// 
app.use(bodyParser.urlencoded({extended: true}));

// 
app.use('/', require('./server/routes/main'));

// Listening to port 5000
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
})


// Export the Express API
module.exports = app;