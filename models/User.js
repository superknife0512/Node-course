const mongoose = require('mongoose');

const schema = mongoose.Schema;

const userSchema = new schema({
    email: String,
    password: String,
    cart:{
        items:[{
            productId:{
                type:  mongoose.Types.ObjectId,
                ref:'Products',
                required: true
            },
            qty: Number
        }]
    }
})

userSchema.methods.addToCart = function(product){

    let updatedCart = this.cart;
    let updatedItems = [...updatedCart.items];

    let record = updatedItems.find(item=>{
        return item.productId.toString() === product._id.toString();
    })

    if(record){
        // have a product in cart
        record.qty += 1
    } else {
        updatedItems.push({
            productId: product._id,
            qty: 1
        })
    }

    updatedCart={
        items: updatedItems
    }
    this.cart = updatedCart
    this.save();    
}

userSchema.methods.deleteCartItem = function(itemId){
    let updatedCart = this.cart;
    let updatedItems;

    updatedItems = updatedCart.items.filter(item=>{
        return item._id.toString() !== itemId.toString()
    })

    updatedCart = {
        items: updatedItems
    }

    this.cart = updatedCart;
    this.save();
}

userSchema.methods.clearCart = async function(){
    this.cart={items: []};
    await this.save()
}


module.exports = mongoose.model('User', userSchema)

// module.exports = class User {
//     constructor(username, email, cart, userId) {
//         this.username = username;
//         this.email = email;
//         this.cart = cart; // cart={items:[], totalPrice:0}
//         this.userId = userId // idObject from mongodb
//     }

//     addToCart(product) {
//         const updatedCart = {...this.cart};
//         const updatedCartItems = updatedCart.items; // it's an array
//         const existProdIndex = updatedCartItems.findIndex(ele => product._id.toString() === ele.id.toString());
//         if (existProdIndex >= 0) {
//             // we do have an product
//             let newQty;
//             newQty = updatedCartItems[existProdIndex].qty + 1;
//             updatedCartItems[existProdIndex].qty = newQty;
//         } else {
//             // create new product in items array
//             updatedCartItems.push({
//                 id: new mongodb.ObjectId(product._id),
//                 qty: 1
//             })
//         }
//         updatedCart.items = updatedCartItems;
//         const db = getDB();
//         db.collection('users').updateOne({
//             _id: this.userId
//         }, {
//             $set: {
//                 cart: updatedCart
//             }
//         })
//     }

//     getCartData(){
//         const userCart = this.cart;
//         const userCartItems = userCart.items;
//         const db = getDB();
//         const existIds = userCartItems.map( item=>{
//             return item.id
//         })

//         return db.collection('products').find({_id:{$in:existIds}}).toArray().then(products=>{
//             return products.map(product=>{
//                 return {
//                     ...product,
//                     qty: userCartItems.find( item=> item.id.toString() === product._id.toString()).qty
//                 }
//             })
//         })
//     }

//     createUser() {
//         const db = getDB();
//         db.collection('users').insertOne(this).then(result => {
//             console.log('create user success');
//         }).catch(err => {
//             console.log(err);
//         })
//     }

//     static findUser(userId) {
//         const db = getDB();

//         return db.collection('users').find({
//             _id: new mongodb.ObjectId(userId)
//         }).next().then(result => {
//             console.log('susessful!');
//             return result
//         }).catch(err => {
//             console.log(err);
//         })
//     }

//     deleteItem(productId){        
//         const db = getDB();
//         let updatedCart = this.cart;
//         let updatedCartItems = updatedCart.items;
//         updatedCartItems = updatedCartItems.filter(item=> item.id.toString() !== productId.toString());
//         updatedCart = {
//             items: updatedCartItems,
//             totalPrice: 0,
//         }
//         db.collection('users').updateOne({_id: this.userId},{
//             $set:{
//                 cart: updatedCart
//             }
//         }).then(console.log('delete success!')).catch(err=>{
//             console.log(err);
//         })
//     }

//     async addOrder(){
//         try{
//             const db = getDB();
//             const cartData = await this.getCartData();
//             const order = {
//                 cart: cartData,
//                 userId: this.userId,
//                 username: this.username
//             }
//             await db.collection('orders').insertOne(order);
//             console.log('finish');
//             // clear everything in our carts
//             const updatedCart=this.cart={
//                 items: [],                
//             }
//             await db.collection('users').updateOne({_id: this.userId}, {$set:{
//                 cart: updatedCart
//             }})

//         } catch (err){
//             console.log(err);
//         }
//     }

//     async getOrder(){
//         const db = getDB();
//         try{
//             const orderRes = await db.collection('orders').find({userId: this.userId}).toArray();
//             return orderRes

//         } catch(err){
//             throw err;
//         }
//     }
// }