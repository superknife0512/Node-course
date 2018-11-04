const express = require('express');

const productController = require('../controllers/productsCtrl');

const route = express.Router();

route.get('/', productController.renderProducts)

module.exports = route;