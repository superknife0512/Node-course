const express = require('express');

const route = express.Router();

const authController = require('../controllers/authCtrl')

route.get('/login', authController.renderLogin)

module.exports = route;