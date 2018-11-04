const express = require('express');
const path = require('path');

const route = express.Router();

const products = [];

route.post('/add-product', (req, res)=>{
    products.push({'title': req.body.title})
    res.redirect('/');
})

route.get('/add-product', (req, res)=>{
    res.render('add-product', {title: 'add-product',
                                path: '/add-product'})
})

module.exports = {
    route,
    products
};

