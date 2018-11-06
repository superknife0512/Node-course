
const Product = require('../models/Products');


const renderProducts = (req,res,next)=>{
    Product.getProducts( products => {
        res.render('shop/shop-list', {products,
                            title: 'Online shop',
                            path:'/'});
    });    
}

const renderCart = (req,res,next)=>{
    res.render('shop/cart', {title: 'Cart', path: '/cart'})
}

const renderIndexPro = (req,res,next)=>{
    res.render('shop/index', {title: 'Index Product', path: '/index-product'})
}

const renderCheckOut = (req,res,next)=>{
    res.render('shop/check-out', {title: 'Check Out Page', path: '/check-out'})
}

const renderOrder = (req,res,next)=>{
    res.render('shop/order', {title: 'Your Order', path: '/order'})
}

const renderDetail = (req,res,next)=>{
    const prodId = req.params.productId;
    Product.getProductDetail(prodId, (product)=>{
        res.render('shop/product-detail', {product, title: product.title, path:'/product'})
    })
}




module.exports = {
    renderProducts,
    renderCart,
    renderIndexPro,
    renderCheckOut,
    renderOrder,
    renderDetail
}