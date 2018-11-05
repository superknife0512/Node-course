
const Product = require('../models/Products');

const addProduct = (req, res)=>{
    const product = new Product(req.body.title)
    product.addProduct();
    res.redirect('/');
}

const renderProduct = (req, res)=>{
    res.render('admin/add-product', {title: 'add Product',
                                path: '/admin/add-product'})
}

const renderProducts = (req,res,next)=>{
    Product.getProducts( products => {
        res.render('shop/shop-list', {products,
                            title: 'Online shop',
                            path:'/'});
    });
    
}


module.exports = {
    addProduct,
    renderProduct,
    renderProducts,
}