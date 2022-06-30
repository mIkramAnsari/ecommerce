const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String,
        required: true, 
    },
    email:{
        type: String,
        required: true,
    },
     phone :{
        type: Number,
        required: true,
    },
    password:{
        type : String,
        required: true,
    },
    user_type:{
        type: String,
        enum: ['buyer' , 'seller'],
        required: true,
    },
    cart:[{
        type : Schema.Types.ObjectId,
        ref : "Product",
    }]
    
})

const User = mongoose.model('User', userSchema);
module.exports = User;
