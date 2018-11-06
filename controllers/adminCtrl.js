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
    const productNumber = Product.getProductNum();
    Product.getProducts( product => {
        res.render('admin/adminProducts', {
            product,
            title: 'Admin Product',
            path: '/admin-product',
            productNumber,
        });
    })
}

const renderEdit = (req, res, next) => {
    res.render('admin/edit',{title: 'Edit Page', path: '/edit'})
}

module.exports = {
    addProduct,
    renderAddProduct,
    renderAdminProduct,
    renderEdit
}