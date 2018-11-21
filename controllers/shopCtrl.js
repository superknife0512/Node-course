const Product = require('../models/Products');
const Order = require('../models/Order');
const User = require('../models/User');


const renderProducts = (req, res, next) => {
    Product.find().then(products => {
        // console.log(products);
        res.render('shop/shop-list', {
            products,
            title: 'Online shop',
            path: '/'
        });
    }).catch(err => {
        console.log('err1');
    });
}

const renderCart = async (req, res, next) => {
    try{
        let totalAmount = 0;
        const cartProducts = await req.user.populate('cart.items.productId').execPopulate();
        cartProducts.cart.items.forEach(item=>{
            totalAmount += item.qty * item.productId.price;
        })
        // console.log(cartProducts.cart.items);
        res.render('shop/cart',{
            items: cartProducts.cart.items,
            path:'/cart',
            title: 'Your Cart',
            totalAmount: totalAmount.toFixed(2),
        })
    } catch(err){
        console.log('err2');
    }
}

const renderIndexPro = (req, res, next) => {
    res.render('shop/index', {
        title: 'Index Product',
        path: '/index-product'
    })
}

// const renderCheckOut = (req, res, next) => {
//     res.render('shop/check-out', {
//         title: 'Check Out Page',
//         path: '/check-out'
//     })
// }

const renderDetail = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId).then(product => {
        if (product) {
            return res.render('shop/product-detail', {
                product,
                title: product.title,
                path: '/'
            })
        }
    }).catch(err => {
        console.log('err3');
    })
}

const addToCart = async (req, res, next) => {
    try{

        const prodId = req.body.productId;
        const product = await Product.findById(prodId);
        await req.user.addToCart(product);
        console.log('Done');
        res.redirect('/')
    } catch(err){
        console.log('err4');
    }
}

const deleteCart = async (req, res, params) => {
    try{
        const itemId = req.body.itemId;
        await req.user.deleteCartItem(itemId);
        res.redirect('/cart');
    } catch (err){
        console.log('err5');
    }
}

const addToOrder = async (req, res, next) => {
    try{
        const userData = await req.user.populate('cart.items.productId').execPopulate();
        
        const productInfo = userData.cart.items.map( item=>{
            return {
                // must access to _doc to pull out all data we need
                product: item.productId._doc,
                qty: item.qty
            }
        })

        const order = new Order({
            products: productInfo,
            user:{
                username: req.user.username,
                userId: req.user
            }
        })

        await order.save();
        await req.user.clearCart();
        console.log('Done!');
        res.redirect('/order')
    }catch(err){
        console.log('err6');
    }
}

const renderOrder = async (req, res, next) => {
    const orders = await Order.find({'user.userId':req.user._id});
    res.render('shop/order', {
        path:'/order',
        orders: orders,
        title: ' Your order '
    })
}


module.exports = {
    renderProducts,
    renderIndexPro,
    // renderCheckOut,
    renderOrder,
    addToOrder,
    renderDetail,
    renderCart,
    addToCart,
    deleteCart
}