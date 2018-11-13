const Product = require('../models/Products');
const Cart = require('../models/Cart');
const User = require('../models/User');


const renderProducts = (req, res, next) => {
    Product.fetchAll().then(products => {
        res.render('shop/shop-list', {
            products,
            title: 'Online shop',
            path: '/'
        });
    }).catch(err => {
        console.log(err);
    });
}

const renderCart = (req, res, next) => {
    req.user.getCartData().then(cartItems => {
        if (!cartItems) {
            return res.render('shop/cart', {
                path: '/cart',
                title: 'Your cart',
                cartProducts: null,
                cartTotalPrice: 0
            })
        }
        res.render('shop/cart', {
            path: '/cart',
            title: 'Your cart',
            cartItems,
        })
    }).catch(err=>{
        console.log(err);
    })
}

const renderIndexPro = (req, res, next) => {
    res.render('shop/index', {
        title: 'Index Product',
        path: '/index-product'
    })
}

const renderCheckOut = (req, res, next) => {
    res.render('shop/check-out', {
        title: 'Check Out Page',
        path: '/check-out'
    })
}

const renderOrder = (req, res, next) => {
    res.render('shop/order', {
        title: 'Your Order',
        path: '/order'
    })
}

const renderDetail = (req, res, next) => {
    const prodId = req.params.productId;
    Product.getProductDetail(prodId).then(product => {
        if (product) {
            return res.render('shop/product-detail', {
                product,
                title: product.title,
                path: '/'
            })
        }
    }).catch(err => {
        console.log(err);
    })
}
const addToCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.getProductDetail(prodId).then(product => {
        console.log(product);
        return product
    }).then(product => {
        req.user.addToCart(product)
    }).catch(err => {
        console.log(err);
    })
    res.redirect('/')
}

const deleteCart = (req, res, params) => {
    const prodId = req.body.cartItemId;
    req.user.deleteItem(prodId)
    res.redirect('/cart');
}


module.exports = {
    renderProducts,
    renderCart,
    renderIndexPro,
    renderCheckOut,
    renderOrder,
    renderDetail,
    addToCart,
    deleteCart
}