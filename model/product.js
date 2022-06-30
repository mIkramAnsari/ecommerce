const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name:{
        type: String,
        required: true, 
        unique: true
    },
    price:{
        type: Number,
        required: true,
    },
    stock:{
        type: Number,
        required: true,
    },
    seller_id:{
        type : Schema.Types.ObjectId,
        ref : "User"
    }
    
})

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
