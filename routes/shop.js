const express = require('express');
const route = express.Router();

route.get('/', (req,res,next)=>{
    res.send(`
        <form action="/product" method="POST">
            <input type="text" name="title" >
            <input type="submit" value="submit">
        </form>
    `);

})

module.exports = route;