const express = require('express');

const productController = require('../controllers/productsCtrl');

const route = express.Router();


route.post('/add-product', productController.addProduct)

route.get('/add-product', productController.getAddProduct)

module.exports = route;

