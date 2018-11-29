const Product = require('../models/Products');
const { validationResult } = require('express-validator/check');
const mongoose = require('mongoose');

const addProduct = (req, res,next) => {
    
    const title = req.body.title;
    const image = req.file;
    const price = req.body.price;
    const des = req.body.des;
    const userId = req.user;
    const errors = validationResult(req);

    const renderError = (message = errors.array()[0].msg)=>{
        return res.status(422).render('admin/edit-product',{
            title: 'add Product',
            path: '/add-product',
            editMode: false,
            hasError: true,
            errorMess: message,
            product:{
                title,
                price,
                des
            }
        })
    }

    if(!image){
        return renderError('Please choose a valid image!')
    }

    const imagePath = image.path;

    if(!errors.isEmpty()){
        return renderError();
    }

    const product = new Product({ title, imageUrl: imagePath, price, des, userId});
    product.save().then(result=>{
        console.log('Has been added');
    }).catch(err=>{
        console.log('can work')
    })
    res.redirect('/admin-product');
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
            errorMess:''
        })
    }).catch(err => {
        console.log(err);
    })
}

const editProduct = async (req, res, next) => {
    const imageFile = req.file;

    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedDes = req.body.des;

    const product = await Product.findById(prodId);
    if(product.userId.toString() !== req.user._id.toString()){
        return res.redirect('/')
    }
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.des = updatedDes;

    if(imageFile){
        product.imageUrl = imageFile.path;
    }

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