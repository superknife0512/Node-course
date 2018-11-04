const products = [];

const addProduct = (req, res)=>{
    products.push({'title': req.body.title})
    res.redirect('/');
}

const getAddProduct = (req, res)=>{
    res.render('add-product', {title: 'add-product',
                                path: '/add-product'})
}

const renderProducts = (req,res,next)=>{
    res.render('shop', {products,
                        title: 'Online shop',
                        path:'/'});
}

const render404Page = (req,res,next)=>{
    res.status(404).render('404err', {title: '404 Error!', path: ''})
}

module.exports = {
    addProduct,
    getAddProduct,
    renderProducts,
    render404Page
}