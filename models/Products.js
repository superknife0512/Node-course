const fs = require('fs');
const path = require('path');

const p = path.join(__dirname, '..', 'data', 'productData.json');

module.exports = class Product {
    constructor(title, imageUrl, price, des) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.des = des;
    }

    addProduct() {
        this.id = Math.random().toString(35).substr(2,7);
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

    static getProductNum(){
        fs.readFile(p, (err, data)=>{
            if(err){
                return 0;
            } else {
                const parseData = JSON.parse(data);
                return parseData.length;
            }
        })
    }

    static getProductDetail(id, cb){ 
        fs.readFile( p, (err,data)=>{
            const proAll = JSON.parse(data);
            const proDetail = proAll.find(ele => ele.id === id)
            cb(proDetail)
        })
    }   
}

