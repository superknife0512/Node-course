const mongoConnect = require('../utilities/database')
const getDB = mongoConnect.getDatabase;

const Cart = require('./Cart');

module.exports = class Product {
    constructor(title, imageUrl, price, des) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.des = des;
    }
    save() {
        const db = getDB();
        return db.collection('products').insertOne(this).then(result => {
            console.log(result);
        }).catch(err => {
            console.log(err);
        });
    }

    static fetchAll() {
        const db = getDB();
        return db.collection('products').find().toArray().then(products => {
            console.log(products);
            return products
        }).catch(err => {
            throw err
        })
    }
}