const express = require('express');

const adminController = require('../controllers/adminCtrl');
const protectAuth = require('../middleware/protectAuth');
const route = express.Router();


route.post('/add-product', protectAuth, adminController.addProduct);
route.get('/add-product', protectAuth, adminController.renderAddProduct);
route.get('/admin-product', protectAuth, adminController.renderAdminProduct);
route.post('/edit-product', protectAuth, adminController.editProduct);
route.post('/delete', protectAuth, adminController.deleteProduct);
route.get('/edit-product/:productId', protectAuth, adminController.renderEdit);


module.exports = route;