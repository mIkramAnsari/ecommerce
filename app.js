const express = require('express');
const dotenv = require('dotenv');
require('./config/database')
dotenv.config({path:'./config.env'});
const routes = require('./routers/routes')
const cors = require('cors')



const app = express();
app.use(cors());
app.use(express.json());
app.use("/", routes);
app.get("/", (req,res) =>{
res.send("Welcome to ecommerce")
})

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`The project is running on PORT ${PORT}.`);
  });