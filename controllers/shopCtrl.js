const Product = require('../models/Products');
const Order = require('../models/Order');
const User = require('../models/User');

const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit')


const renderProducts = (req, res, next) => {
    Product.find().then(products => {
        // console.log(products);
        res.render('shop/shop-list', {
            products,
            title: 'Online shop',
            path: '/',
        });
    }).catch(err => {
        console.log('err1');
    });
}



const renderIndexPro = (req, res, next) => {
    res.render('shop/index', {
        title: 'Index Product',
        path: '/index-product',
    })
}

// const renderCheckOut = (req, res, next) => {
//     res.render('shop/check-out', {
//         title: 'Check Out Page',
//         path: '/check-out'
//     })
// }

const renderDetail = async (req, res, next) => {
    try{

        const prodId = req.params.productId;
        const product = await Product.findById(prodId);
        res.render('shop/product-detail', {
            product,
            title: product.title,
            path: '/',
    
        })
    } catch(err){
        console.log('err2');
    }
}

const addToCart = async (req, res, next) => {
    try {

        const prodId = req.body.productId;
        const product = await Product.findById(prodId);
        await req.user.addToCart(product);
        console.log('Done');
        res.redirect('/')
    } catch (err) {
        console.log('err4');
    }
}

const deleteCart = async (req, res, params) => {
    try {
        const itemId = req.body.itemId;
        await req.user.deleteCartItem(itemId);
        res.redirect('/cart');
    } catch (err) {
        console.log('err5');
    }
}

const addToOrder = async (req, res, next) => {
    try {
        const userData = await req.user.populate('cart.items.productId').execPopulate();

        const productInfo = userData.cart.items.map(item => {
            return {
                // must access to _doc to pull out all data we need
                product: item.productId._doc,
                qty: item.qty
            }
        })

        const order = new Order({
            products: productInfo,
            user: {
                userId: req.user
            }
        })

        await order.save();
        await req.user.clearCart();
        console.log('Done!');
        res.redirect('/order')
    } catch (err) {
        console.log('err6');
    }
}

const renderCart = async (req, res, next) => {
    try {
        const userData = await req.user.populate('cart.items.productId').execPopulate();
        const userItems = userData.cart.items;
        let totalPrice = 0;
        userItems.forEach(item => {
            totalPrice += item.productId.price * item.qty;
        });

        res.render('shop/cart', {
            title: 'Cart',
            path: '/cart',
            totalAmount: totalPrice.toFixed(2),
            items: userItems
        })

    } catch (err) {
        console.log(err);
    }
}

const renderOrder = async (req, res, next) => {
    const orders = await Order.find({
        'user.userId': req.user._id
    });
    res.render('shop/order', {
        path: '/order',
        orders: orders,
        title: ' Your order ',
    })
}

const getInvoice = async (req,res,next)=>{
    const invoiceId = req.params.orderId;
    const invoicePath = path.join(__dirname, '..', 'data', 'invoices', `invoice-${invoiceId}.pdf`);
    const userInvoice = await Order.findOne({_id: invoiceId, 'user.userId': req.user._id});

    if(userInvoice){

        const doc = new PDFDocument;

        res.setHeader('content-type', 'application/pdf');
        
        doc.pipe(fs.createWriteStream(invoicePath));
        doc.pipe(res);

        // set title 
        doc.fontSize(24).text(`invoice-#${invoiceId}`);
        doc.fontSize(20).text('---------------------------------------');
        let totalPrice = 0;
        //products
        userInvoice.products.forEach(prod=>{
            totalPrice += prod.qty * prod.product.price
            doc.fontSize(15).text(`${prod.product.title}: ${prod.qty}*$${prod.product.price}`)
            doc.text('---', {lineGap: 10})
        })

        doc.fontSize(20).text(`Total amount: $${totalPrice.toFixed(2)}`).fillColor('red');
        // fs.readFile(invoicePath, (err,data)=>{
        //     if(!err){
        //         res.setHeader('content-type', 'application/pdf');
        //         res.send(data)
        //     } else { 
        //         console.log(err);
        //     }
        // })
        // must be recommend *************************
        // const file = fs.createReadStream(invoicePath);
        // file.pipe(res)
        doc.end();
    } else {
        res.redirect('/order')
    }
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
    deleteCart,
    getInvoice
}