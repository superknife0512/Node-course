const express = require('express');
const path = require('path');

const route = express.Router();
const adminData = require('./admin');

route.get('/', (req,res,next)=>{
    res.render('shop', {products: adminData.products,
                        title: 'Online shop',
                        path:'/'});
})

module.exports = route;