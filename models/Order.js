const mongoose = require('mongoose');

const schema = mongoose.Schema;

const orderSchema = new schema({
    products:[
        {
            product: Object,
            qty: Number,
        }
    ],
    user:{
        userId: mongoose.Types.ObjectId
    }
})

module.exports = mongoose.model('Orders', orderSchema);