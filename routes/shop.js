const express = require('express');

const shopController = require('../controllers/shopCtrl');
const protectAuth = require('../middleware/protectAuth');

const route = express.Router();

route.get('/', shopController.renderProducts)
route.get('/index-product', shopController.renderIndexPro)
route.get('/cart', protectAuth, shopController.renderCart)
route.post('/cart', protectAuth, shopController.addToCart)
// // route.get('/check-out', shopController.renderCheckOut)
route.get('/order', protectAuth, shopController.renderOrder)
route.post('/order', protectAuth, shopController.addToOrder)
route.post('/delete-cart', protectAuth, shopController.deleteCart)
route.get('/:productId', shopController.renderDetail)

module.exports = route;