const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});

const DB_URL = process.env.MONGOURL;

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
}).then( ()=>{
    console.log("Connection Successful to Database");
}).catch((err) => console.log('no connection: ',err));
