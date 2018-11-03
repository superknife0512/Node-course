const express = require('express');
const path = require('path');

const route = express.Router();

route.post('/add-product', (req, res)=>{
    const result = req.body;
    console.log(result);
    res.redirect('/');
})

route.get('/add-product', (req, res)=>{
    res.sendFile(path.join(__dirname, '../', 'views', 'add-product.htm'));
})

module.exports = route;