const fs = require('fs');
const path = require('path');

const Cart = require('./Cart');

const p = path.join(__dirname, '..', 'data', 'productData.json');

function getDataFromFile(cb) {
    fs.readFile(p, (err, fileContent) => {
        if (!err) {
            const returnData = JSON.parse(fileContent);
            cb(returnData)
        } else {
            cb(null);
        }
    })
}

module.exports = class Product {
    constructor(id, title, imageUrl, price, des) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.des = des;
        this.id = id
    }

    addProduct() {

        getDataFromFile(products => {

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
        })
    }

    seoTitle() {
        const titleArr = this.title.split(' ');
        this.seoTitle = titleArr.join('-');
    }

    static getProducts(fn) {
        getDataFromFile(products => {
            fn(products)
        })
    }

    static getProductDetail(id, cb) {
        getDataFromFile(products => {
            if (products) {
                const dataDetail = products.find(ele => ele.id === id);
                cb(dataDetail);
            } else {
                cb([])
            }
        })
    }

    static deleteProduct(id) {

        getDataFromFile(products => {
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