const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded())



app.use('/product', (req, res)=>{
    const result = req.body;
    console.log(result);
    res.redirect('/add-product');
})

app.use('/add-product', (req, res)=>{
    res.send('<h2>add product page</h2>')
})

app.use('/', (req,res,next)=>{
    res.send(`
        <form action="/product" method="POST">
            <input type="text" name="title" >
            <input type="submit" value="submit">
        </form>
    `);

})

app.listen(8080);