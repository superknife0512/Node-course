const Product = require('../models/Products');

const addProduct = (req, res) => {
    const title= req.body.title;
    const imageUrl= req.body.imageUrl;
    const price= req.body.price;
    const des= req.body.des;

    const product = new Product(title,imageUrl,price,des);
    product.addProduct();
    res.redirect('/');
}

const renderAddProduct = (req, res) => {
    res.render('admin/add-product', {
        title: 'add Product',
        path: '/add-product'
    })
}

const renderAdminProduct = (req, res, next) => {
    res.render('admin/adminProducts', {
        title: 'Admin Product',
        path: '/admin-product'
    });
}

module.exports = {
    addProduct,
    renderAddProduct,
    renderAdminProduct
}