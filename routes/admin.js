const express = require('express');

const adminController = require('../controllers/adminCtrl');

const route = express.Router();


route.post('/add-product', adminController.addProduct);
route.get('/add-product', adminController.renderAddProduct);
route.get('/admin-product', adminController.renderAdminProduct);

module.exports = route;

