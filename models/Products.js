const fs = require('fs');
const path = require('path');

const Cart = require('./Cart');

const p = path.join(__dirname, '..', 'data', 'productData.json');

module.exports = class Product {
    constructor(id, title, imageUrl, price, des) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.des = des;
        this.id = id
    }

    addProduct() {
        fs.readFile(p, (err, fileContent) => {
            let products = [];
            if (!err) { //file exist - fetch all products from file
                products = JSON.parse(fileContent);

                if (this.id) {
                    // check if it have ID that's time we update our product 
                    const productIndex = products.findIndex(ele => ele.id === this.id);
                    const updatedProducs = [...products];
                    updatedProducs[productIndex] = this;
                    fs.writeFile(p, JSON.stringify(updatedProducs), err => {
                        console.log(err);
                    })
                } else {
                    //we will create new product if don't have any ID yet
                    this.id = Math.random().toString(35).substr(2, 7);
                    products.push(this);
                    fs.writeFile(p, JSON.stringify(products), err => {
                        console.log(err);
                    })
                }
                this.seoTitle();
            }
        })
    }

    seoTitle() {
        const titleArr = this.title.split(' ');
        this.seoTitle = titleArr.join('-');
    }

    static getProducts(fn) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                // file doesn't exist yet
                console.log('get product fail' + err);
                fn([])
            } else {
                fn(JSON.parse(fileContent))
            }
        })
    }

    static getProductDetail(id, cb) {
        fs.readFile(p, (err, data) => {
            if (err) {
                cb([])
            } else {
                const allProducts = JSON.parse(data);
                const dataDetail = allProducts.find(ele => ele.id === id);
                cb(dataDetail);
            }
        })
    }

    static deleteProduct(id) {
        fs.readFile(p, (err, fileContent) => {
            // fetch data from products file
            const products = JSON.parse(fileContent);
            const productDel = products.find(ele => ele.id === id)
            const productIndex = products.findIndex(ele => ele.id === id);
            products.splice(productIndex, 1);
            fs.writeFile(p, JSON.stringify(products), err => {
                console.log(err);
            })

            Cart.deleteProductCart(id, productDel.price)
        })
    }
}