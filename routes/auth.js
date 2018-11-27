const express = require('express');
const {check, body} = require('express-validator/check')
const route = express.Router();
const bcrypt = require('bcryptjs')

const User = require('../models/User');

const authController = require('../controllers/authCtrl')

route.get('/login', authController.renderLogin)
route.get('/sign-up', authController.renderSignup)
route.get('/reset', authController.renderReset)
route.post('/login',[
    //add validation here
    body('email', 'please enter a valid email!')
        .isEmail().normalizeEmail(),
] , authController.postLogin)
route.post('/logout', authController.postLogout )
route.post('/signup', [
    // validation middleware
    check('email')
        .isEmail()
        .withMessage('Please enter valid email')
        .normalizeEmail(),

    body('pass', 'Please enter password that has at least 6 charaters long and contain only normal character')
        .isLength({min: 5})
        .isAlphanumeric()
        .trim()

    ], authController.postSignup )
    
route.post('/reset', authController.postReset )
route.get('/reset/:token', authController.renderResetPassword )
route.post('/new-password', authController.postNewPassword )

module.exports = route;