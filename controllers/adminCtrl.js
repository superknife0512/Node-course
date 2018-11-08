const Product = require('../models/Products');

const addProduct = (req, res) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const des = req.body.des;

    const product = new Product(null, title, imageUrl, price, des);
    product.addProduct();
    res.redirect('/');
}

const renderAddProduct = (req, res) => {
    res.render('admin/edit-product', {
        title: 'add Product',
        path: '/add-product',
        editMode: false,
    })
}

const renderAdminProduct = (req, res, next) => {
    Product.getProducts(product => {
        res.render('admin/adminProducts', {
            product,
            title: 'Admin Product',
            path: '/admin-product',
        });
    })
}

const renderEdit = (req, res, next) => {
    const editMode = req.query.edit;
    const prodId = req.params.productId;
    if (!editMode) {
        res.redirect('/');
    }
    Product.getProductDetail(prodId, product => {
        if (!product) {
            return false
        }
        res.render('admin/edit-product', {
            title: 'Edit Page',
            path: '/edit-product',
            editMode,
            product
        })
    })
}

const editProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedDes = req.body.des;
    const updatedImageUrl = req.body.imageUrl;

    const product = new Product(prodId, updatedTitle, updatedImageUrl, updatedPrice, updatedDes);
    product.addProduct();
    res.redirect('/admin-product');
}
const deleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteProduct(prodId);
    res.redirect('/admin-product');
}



module.exports = {
    addProduct,
    renderAddProduct,
    renderAdminProduct,
    renderEdit,
    editProduct,
    deleteProduct
}