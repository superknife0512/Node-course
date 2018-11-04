const render404Page  = (req,res,next)=>{
    res.status(404).render('404err', {title: '404 Error!', path: ''})
}

module.exports = render404Page;