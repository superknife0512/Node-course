exports.render404Page  = (req,res,next)=>{
    res.status(404).render('404err', {title: '404 Error!', path: '',
    isLogin: req.session.isLogin,
    })
}

// exports.render500Page = (req,res,next)=>{
//     res.status(500).render('500err',
//     {
//         title: '500 Error!', 
//         path:'', 
//         isLogin: req.session.isLogin,
//         csrfToken: req.csrfToken()
//     })
// }
