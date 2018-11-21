
exports.renderLogin = (req,res,next)=>{
    // isAuth = req.get('cookie').trim().split('=')[1] === 'true';
    // console.log(isAuth);
    console.log(req.session.isLogin);
    res.render('auth/login',{
        path:'/login',
        title: 'Login',
    })
}

exports.postLogin = (req, res, next)=>{
    req.session.isLogin = true
    res.redirect('/')
}