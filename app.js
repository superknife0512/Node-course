const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const mongoose = require('mongoose');
const session = require('express-session');
const csrf = require('csurf');
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
const csrfProtection = csrf();
const flash = require('connect-flash');

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(session({
    secret: `Toan's secret`,
    resave: false,
    saveUninitialized: false,
    store,
}))
app.use(csrfProtection);

// serving static file
app.use('/edit-product', express.static(path.join(__dirname, 'public')))
app.use('/reset', express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public')))

app.use((req,res,next)=>{
    res.locals.isLogin = req.session.isLogin;
    res.locals.csrfToken = req.csrfToken();
    next();
})

app.use(flash());

//assign userdata for each request 
app.use( async (req,res,next)=>{
    if(!req.session.userData){
        return next();
    }
    req.user = await User.findById(req.session.userData._id);
    next();
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
    
}).catch(err=>{
    throw err
})