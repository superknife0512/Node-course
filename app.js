const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')

const adminData = require('./routes/admin');
const shopRoute = require('./routes/shop');

const app = express();

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use(adminData.route);
app.use(shopRoute);

//setting using template engine
app.set('view engine', 'pug');
app.set('views', 'views');

// adding 404 brain not found
app.use((req,res,next)=>{
    res.status(404).render('404err', {title: '404 Error!'})
})

app.listen(8080);