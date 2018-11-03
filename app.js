const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')

const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');

const app = express();

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use(adminRoute);
app.use(shopRoute);

// adding 404 brain not found
app.use((req,res,next)=>{
    res.status(404).sendFile(path.join(__dirname, 'views', '404err.html'))
})

app.listen(8080);