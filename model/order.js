const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    status:{
        type: String,
        enum: ['pending' , 'approved','delivered'],
        default: 'pending',
    },
    quantity:{
        type: Number,
        required: true,
        default: 1
    },
    product_id:{
        type : Schema.Types.ObjectId,
        ref : "Product"
    },
    buyer_id:{
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    seller_id:{
        type : Schema.Types.ObjectId,
        ref : "User"
    }
    
})

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
