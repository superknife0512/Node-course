const express = require('express');

const route = express.Router();

const authController = require('../controllers/authCtrl')

route.get('/login', authController.renderLogin)
route.get('/sign-up', authController.renderSignup)
route.get('/reset', authController.renderReset)
route.post('/login', authController.postLogin)
route.post('/logout', authController.postLogout )
route.post('/signup', authController.postSignup )

module.exports = route;