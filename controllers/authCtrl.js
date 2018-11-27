const User = require('../models/User');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { validationResult } = require('express-validator/check');

const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:'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'
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
        errorMess: req.flash('error'),
        email: '',
        pass: ''
    })
}

exports.postSignup=async (req,res,next)=>{
    
    try{        
        const email = req.body.email;
        const pass= req.body.pass;
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(422).render('auth/signup',{
                path:'/sign-up',
                title: 'Sign up',
                errorMess: errors.array()[0].msg,
                email,
                pass,
            })
        }

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
        console.log(err);
    }
}

exports.postLogin = async (req, res, next)=>{
    try{

        const email = req.body.email;
        const password = req.body.pass;
        // find user on server 
        const existUser = await User.findOne({email: email});
        if(!existUser) {
            await req.flash('errorMess', 'Your email or password is invalid');
            res.redirect('/login');
        } else {
            const checkRes = await bcrypt.compare(password, existUser.password);
            if(checkRes){
                req.session.isLogin = true;
                req.session.userData = existUser;
                await req.session.save();
                setTimeout(()=>{
                    res.redirect('/')
                },1500)
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

exports.postReset = (req,res,next)=>{
    const email = req.body.email;    
    crypto.randomBytes(32, async (err, buffer)=>{
        try{
            if(err){
                throw err;
            } else {
                const token = buffer.toString('hex');
                const existUser = await User.findOne({email: email});
                if(!existUser){
                    req.flash('error','Please enter a valid email!');
                    res.redirect('/reset')
                } else {
                    existUser.resetToken = token;
                    existUser.tokenExpiration = Date.now() + 3600000;
                    await existUser.save();

                    transporter.sendMail({
                        subject:'Password Reset',
                        from:'shop@gmail.com',
                        to: email,
                        html:`
                         <h4>Reset your password here</h4>
                         <p>Please click to this link below to reset</p>
                         <a href="http://localhost:3000/reset/${token}">reset now!</a>
                        `
                    })
                    
                    res.redirect('/login')
                }
            }
        } catch (err){
            console.log(err);
        }
    })
}

exports.renderResetPassword = async (req,res,next)=>{
    try{
        const token = req.params.token;
        const user = await User.findOne({
            resetToken: token.toString(),
            tokenExpiration: {$gt: Date.now()}
        }) 
        if(user){
            res.render('auth/newPass',{
                path:'/new-password',
                title: 'get new password',
                userId: user._id,
                token, 
                errorMess:null
            })
        } else {
            res.redirect('/login')
        }
    } catch (err) {
        console.log(err);
    }
}

exports.postNewPassword = async (req,res,next)=>{
    try{

        const userId = req.body.userId;
        const token = req.body.token;
        const newPass = req.body.password;
    
        const existUser = await User.findOne({ _id: userId, resetToken: token});
        const hassPass = await bcrypt.hash(newPass, 12);
    
        existUser.password = hassPass;
        existUser.resetToken = undefined;
        existUser.tokenExpiration = undefined;
        await existUser.save();
        res.redirect('/login');

        transporter.sendMail({
            subject:'Your Password has been reseted',
            from: 'shop@gmail.com',
            to: existUser.email,
            html:`<h2>please check your new password
                <a href="http://localhost:3000/login">Login now!</a>
            `
        })

    } catch (err){
        console.log(err);
    }
}