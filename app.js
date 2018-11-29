const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const mongoose = require('mongoose');
const session = require('express-session');
const csrf = require('csurf');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');// flash an error to another request
const multer = require('multer');// transfer file

const MONGODB_URI = 'mongodb+srv://superknife0512:Toan1234@node-app-oqduu.gcp.mongodb.net/shop?retryWrites=true';
const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');
const authRoute = require('./routes/auth');

const {render404Page} = require('./controllers/404Ctrl');
const User = require('./models/User');
const app = express();
const csrfProtection = csrf();

const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
})

const multerStorage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './images');
    },
    filename: (req, file, cb)=>{
        cb(null, `${ Date.now() }-${file.originalname}`)
    }
})

const multerFileFilter = (req, file, cb)=>{
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null, true);
    } else {
        cb(null, false);
    }
}

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(multer({storage: multerStorage, fileFilter: multerFileFilter})
    .single('image'));

app.use(session({
    secret: `Toan's secret`,
    resave: false,
    saveUninitialized: false,
    store,
}))
app.use(flash());
app.use(csrfProtection);


// serving static file
app.use('/edit-product', express.static(path.join(__dirname, 'public')))
app.use('/reset', express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/images', express.static(path.join(__dirname,'images')))

app.use((req,res,next)=>{
    res.locals.isLogin = req.session.isLogin;
    res.locals.csrfToken = req.csrfToken();
    next();
})


//assign userdata for each request 
app.use( async (req,res,next)=>{
    try{

        if(!req.session.userData){
            return next();
        }
        req.user = await User.findById(req.session.userData._id);
        next();
    } catch (err){
        throw new Error(err)
    }
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