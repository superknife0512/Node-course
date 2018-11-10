const Product = require('../models/Products');
const Cart = require('../models/Cart')


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
    Cart.getCartData(cart => {
        if (!cart) {
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
            cartProducts: cart.products,
            cartTotalPrice: cart.totalPrice
        })
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
    Product.getProductDetail(prodId, product => {
        if (product) {
            return res.render('shop/product-detail', {
                product,
                title: product.title,
                path: '/'
            })
        }
        return;
    })
}
const addToCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.getProductDetail(prodId, product => {
        Cart.addToCart(product)
        console.log(product);
    })
    res.redirect('/cart')
}

const deleteCart = (req, res, params) => {
    const prodId = req.body.productId;
    Product.getProductDetail(prodId, product => {
        Cart.deleteProductCart(prodId, product.price)
    })
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