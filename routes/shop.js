const express = require('express');

const shopController = require('../controllers/shopCtrl');

const route = express.Router();

// route.get('/', shopController.renderProducts)
// route.get('/index-product', shopController.renderIndexPro)
// route.get('/cart', shopController.renderCart)
// route.post('/cart', shopController.addToCart)
// // route.get('/check-out', shopController.renderCheckOut)
// route.get('/order', shopController.renderOrder)
// route.post('/order', shopController.addToOrder)
// route.post('/delete-cart', shopController.deleteCart)
// route.get('/:productId', shopController.renderDetail)

module.exports = route;