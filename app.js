const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const mongoose = require('mongoose');

const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');
const render404Page = require('./controllers/404Ctrl');
const User = require('./models/User');

const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use('/edit-product', express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
    User.findUser('5be7f74444babc0e34052e60').then(userData => {
        req.user = new User(userData.username, userData.email, userData.cart, userData._id);
        next();
    }).catch(err => {
        console.log(err);
    })
})

app.use(adminRoute);
app.use(shopRoute);

//setting using template engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// adding 404 brain not found
app.use(render404Page)

mongoose.connect('mongodb+srv://superknife0512:Toan1234@node-app-oqduu.gcp.mongodb.net/shop?retryWrites=true').then(()=>{
    app.listen(3000);
}).catch(err=>{
    throw err
})