const express = require('express');

const shopController = require('../controllers/shopCtrl');

const route = express.Router();

route.get('/', shopController.renderProducts)
route.get('/cart', shopController.renderCart)
route.get('/index-product', shopController.renderIndexPro)
route.get('/check-out', shopController.renderCheckOut)

module.exports = route;