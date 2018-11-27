const Product = require('../models/Products');
const { validationResult } = require('express-validator/check')

const addProduct = (req, res) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const des = req.body.des;
    const userId = req.user;
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).render('admin/edit-product',{
            title: 'add Product',
            path: '/add-product',
            editMode: false,
            hasError: true,
            errorMess: errors.array()[0].msg,
            product:{
                title,
                imageUrl,
                price,
                des
            }
        })
    }

    const product = new Product({title, imageUrl, price, des, userId});
    product.save().then(result=>{
        console.log('Has been added');
    }).catch(err=>{
        console.log('err');;
    })
    res.redirect('/');
}

const renderAddProduct = (req, res) => {
    res.render('admin/edit-product', {
        title: 'add Product',
        path: '/add-product',
        editMode: false,
        hasError: false,
        isLogin: req.session.isLogin,
        errorMess: '',
    })
}

const renderAdminProduct = (req, res, next) => {
    Product.find({userId: req.user._id}).then(product => {
        res.render('admin/adminProducts', {
            product,
            title: 'Admin Product',
            path: '/admin-product',
            isLogin: req.session.isLogin
        });
    }).catch(err => {
        console.log('err');
    })
}

const renderEdit = (req, res, next) => {
    const editMode = req.query.edit;
    const prodId = req.params.productId;
    if (!editMode) {
        res.redirect('/');
    }
    Product.findById(prodId).then(product => {
        if (!product) {
            return false
        }
        res.render('admin/edit-product', {
            title: 'Edit Page',
            path: '/edit-product',
            editMode,
            product,
            isLogin: req.session.isLogin,
            errorMess:''
        })
    }).catch(err => {
        console.log('err');
    })
}

const editProduct = async (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedDes = req.body.des;
    const updatedImageUrl = req.body.imageUrl;

    const product = await Product.findById(prodId);
    if(product.userId.toString() !== req.user._id.toString()){
        return res.redirect('/')
    }
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.des = updatedDes;
    product.imageUrl = updatedImageUrl;

    await product.save();

    res.redirect('/admin-product');
}

const deleteProduct = async (req, res, next) => {
    try{

        const prodId = req.body.productId;
        await Product.deleteOne({_id: prodId, userId: req.user._id});
        console.log('Done');
        res.redirect('/admin-product')
    } catch(err){
        res.redirect('/admin-product')
    }

}



module.exports = {
    addProduct,
    renderAddProduct,
    renderAdminProduct,
    renderEdit,
    editProduct,
    deleteProduct,
}