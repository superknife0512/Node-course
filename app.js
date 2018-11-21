const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const MONGODB_URI = 'mongodb+srv://superknife0512:Toan1234@node-app-oqduu.gcp.mongodb.net/shop?retryWrites=true';
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
})

const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');
const authRoute = require('./routes/auth');

const render404Page = require('./controllers/404Ctrl');
const User = require('./models/User');
const app = express();


app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(session({
    secret: `Toan's secret`,
    resave: false,
    saveUninitialized: false,
    store,
}))

// serving static file
app.use('/edit-product', express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
    User.findById('5befdc338230660c982a2478').then(userData => {
        req.user = userData;
        next();
    }).catch(err => {
        console.log(err);
    })
})

app.use(adminRoute);
app.use(authRoute);
app.use(shopRoute);

//setting using template engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// adding 404 brain not found
app.use(render404Page)

mongoose.connect(MONGODB_URI)
    .then(()=>{
    app.listen(3000);
    // create a new user if they don't exist yet
    User.findOne().then(result=>{
        if(!result){
            const user = User({
                username: 'Toan',
                email: 'superknife0512@gmail.com',
                cart:{
                    items:[]
                }
            })
            user.save();
        }
        return false
    })
}).catch(err=>{
    throw err
})