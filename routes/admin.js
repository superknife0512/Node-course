const express = require('express');

const route = express.Router();

route.post('/product', (req, res)=>{
    const result = req.body;
    console.log(result);
    res.redirect('/user');
})

route.get('/add-product', (req, res)=>{
    res.send('<h2>add product page</h2>')
})

route.get('/user', (req, res)=>{
    res.send('<h2>USER page</h2>')
})

module.exports = route;