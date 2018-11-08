const express = require('express');
const path = require('path');

const adminController = require('../controllers/adminCtrl');
const route = express.Router();


route.post('/add-product', adminController.addProduct);
route.get('/add-product', adminController.renderAddProduct);
route.get('/admin-product', adminController.renderAdminProduct);
route.post('/edit-product', adminController.editProduct);
route.post('/delete', adminController.deleteProduct);
route.get('/edit-product/:productId', adminController.renderEdit);

module.exports = route;