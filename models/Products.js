const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    des: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    }
})

module.exports = mongoose.model('Products', productSchema);

// const Cart = require('./Cart');

// module.exports = class Product {
//     constructor(title, imageUrl, price, des, id = null, userId) {
//         this.title = title;
//         this.imageUrl = imageUrl;
//         this.price = price;
//         this.des = des;
//         this._id = id ? new mongodb.ObjectId(id) : null;
//         this.userId = userId
//     }
//     save() {
//         const db = getDB();
//         let dbRes;
//         if (this._id) {
//             //it will be an update action
//             dbRes = db.collection('products').updateOne({
//                 _id: this._id
//             }, {
//                 $set: {
//                     title: this.title,
//                     imageUrl: this.imageUrl,
//                     price: this.price,
//                     des: this.des,
//                     userId: this.userId
//                 }
//             })
//         } else {
//             dbRes = db.collection('products').insertOne(this);
//         }
//         return dbRes.then(result => {
//             console.log(result);
//         }).catch(err => {
//             console.log(err);
//         })
//     }

//     static fetchAll() {
//         const db = getDB();
//         return db.collection('products').find().toArray().then(products => {
//             return products
//         }).catch(err => {
//             throw err
//         })
//     }

//     static getProductDetail(productId) {
//         const db = getDB();
//         return db.collection('products').find({
//             _id: new mongodb.ObjectId(productId)
//         }).next().then(product => {
//             console.log(product);
//             return product;
//         }).catch(err => {
//             console.log(err);
//         })
//     }

//     static deleteProduct(prodId) {
//         const db = getDB();
//         db.collection('products').deleteOne({
//             _id: new mongodb.ObjectId(prodId)
//         }).then(result => {
//             console.log('has been delete');
//         }).catch(err => {
//             console.log(err);
//         })
//     }
// }