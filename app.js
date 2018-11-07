const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')

const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');
const render404Page = require('./controllers/404Ctrl');

const app = express();

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use(adminRoute);
app.use(shopRoute);

//setting using template engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// adding 404 brain not found
app.use(render404Page)

app.listen(3000);