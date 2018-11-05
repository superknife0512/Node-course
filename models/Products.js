const fs = require('fs');
const path = require('path');

const p = path.join(__dirname, '..', 'data', 'productData.json');

module.exports = class Product {
    constructor(title) {
        this.title = title;
    }

    addProduct() {
        fs.readFile(p, (err, fileContent)=>{
            let products = [];
            if(!err){ //file exist 
                products = JSON.parse(fileContent);              
            }
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err=>{
                console.log(err);
            })
        })
    }

    static getProducts( fn ) {
        fs.readFile(p, (err, fileContent)=>{
            if(err){
                // file doesn't exist yet
                console.log('get product fail' + err);
                fn([])
            } else {
                fn(JSON.parse(fileContent))
            }
        })
    }
}


// fs.readFile(p, (err, fileContent)=>{
//     let products = [];
//     if(!err){
//         products = JSON.parse(fileContent);
//     }
//     products.push({title: this.title});
//     fs.writeFile(p, JSON.stringify(products), (err)=>{
//         console.log(err);
//     })
// })

// fs.readFile(p, (err,fileContent)=>{
//     if(err){
//         fn([]);
//     } else {
//         fn(JSON.parse(fileContent));
//     }
// })