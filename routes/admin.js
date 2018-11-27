const express = require('express');
const {body} = require('express-validator/check');
const adminController = require('../controllers/adminCtrl');
const protectAuth = require('../middleware/protectAuth');
const route = express.Router();


route.post('/add-product',[

    body('title')
        .isLength({min: 5, max: 15})
        .withMessage('Title should contain from 5 to 15 characters')
        .isLowercase()
        .withMessage('Please enter all lower case character in title!'),
    body('imageUrl', 'please enter an valid url!')
        .isURL(),
    body('price', 'please enter a valid price. Ex: 18.99')
        .isFloat(),
    body('des')
        .isLength({min: 10, max: 100 })
        .withMessage('Description should be from 10 to 100 charaters')

] ,protectAuth, adminController.addProduct);
route.get('/add-product', protectAuth, adminController.renderAddProduct);
route.get('/admin-product', protectAuth, adminController.renderAdminProduct);
route.post('/edit-product', 
[

    body('title')
        .isLength({min: 5, max: 15})
        .withMessage('Title should contain from 5 to 15 characters')
        .isLowercase()
        .withMessage('Please enter all lower case character in title!'),
    body('imageUrl', 'please enter an valid url!')
        .isURL(),
    body('price', 'please enter a valid price. Ex: 18.99')
        .isFloat(),
    body('des')
        .isLength({min: 10, max: 100 })
        .withMessage('Description should be from 10 to 100 charaters')

] , protectAuth, adminController.editProduct);
route.post('/delete', protectAuth, adminController.deleteProduct);
route.get('/edit-product/:productId', protectAuth, adminController.renderEdit);


module.exports = route;