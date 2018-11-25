const User = require('../models/User');
const bcrypt = require('bcryptjs');

const nodemailer = require('nodemailer');
const sendgridTransporter = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(sendgridTransporter({
   auth:{
       api_key: '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'
   }
}))

exports.renderLogin = (req,res,next)=>{
    // isAuth = req.get('cookie').trim().split('=')[1] === 'true';
    // console.log(isAuth);
    console.log(req.session.isLogin);
    res.render('auth/login',{
        path:'/login',
        title: 'Login',
        errorMess: req.flash('errorMess'),
        isLogin: req.session.isLogin,
    })
}

exports.renderSignup=(req,res,next)=>{
    res.render('auth/signup',{
        path:'/sign-up',
        title: 'Sign up',
        errorMess: req.flash('error')
    })
}

exports.postSignup=async (req,res,next)=>{
    try{
        const email = req.body.email;
        const pass= req.body.pass;
        if(email !== '' && pass !== ''){
            const confirmPass = req.body.confirm_pass;
        
            const existUser = await User.findOne({email: email});
    
            // encrypt password
            const hashPass = await bcrypt.hash(pass, 5);
    
            if(pass !== confirmPass){
                req.flash('error', 'You must enter the same password!');
                res.redirect('/sign-up')
            }
    
            if(!existUser){
                // create a new user
                const user = new User({
                    email: email,
                    password: hashPass,
                    cart:{
                        items:[]
                    }
                })
                await user.save();
                await transporter.sendMail({
                    to: email,
                    from: 'toan@node-shop.com',
                    subject: 'sign up successfully',
                    html:`<h2>Wow! it's success!</h2>`
                })
                res.redirect('/login');
                console.log('Have saved');
            } else {
                req.flash('error', 'This email has been signed up! try another!')
                res.redirect('/sign-up');
            }
        } else {
            req.flash('error', 'You must complete all fields!')
            res.redirect('/sign-up')
        }
    } catch (err){
        console.log('Loi cmnnr');
    }
}

exports.postLogin = async (req, res, next)=>{
    try{

        const email = req.body.email;
        const password = req.body.pass;
        // find user on server 
        const exUser = await User.findOne({email: email});
        if(!exUser) {
            req.flash('errorMess', 'Your email or password is invalid');
            res.redirect('/login');
        } else {
            const checkRes = await bcrypt.compare(password, exUser.password);
            if(checkRes){
                req.session.isLogin = true;
                req.session.userData = exUser;
                await req.session.save()
                res.redirect('/');
            } else {
                req.flash('errorMess', 'Your password is invalid!')
                res.redirect('/login')
            }
        }
    } catch(err){
        console.log(err);
    }
}

exports.postLogout = (req, res, next)=>{
    req.session.destroy(err=>{
        console.log(err);
        res.redirect('/')
    })
}

exports.renderReset = (req,res,next) =>{ 
    res.render('auth/reset',{
        path:'/reset',
        title: 'reset',
        errorMess: req.flash('error')
    })
}