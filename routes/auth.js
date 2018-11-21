const express = require('express');

const route = express.Router();

const authController = require('../controllers/authCtrl')

route.get('/login', authController.renderLogin)
route.post('/login', authController.postLogin)

module.exports = route;