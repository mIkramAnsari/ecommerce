const express = require('express');
const dotenv = require('dotenv');
require('./config/database')
require('./utils/cronJob') 
dotenv.config({path:'./config.env'});
const routes = require('./routers/routes')
const cors = require('cors')
const app = express();


//adminbro
const AdminJS = require("adminjs");
const buildAdminRouter = require("./adminbro/admin.router");
const options = require("./adminbro/admin.options");
const admin = new AdminJS(options);

const router = buildAdminRouter(admin);
app.use(admin.options.rootPath, router);

app.use(express.json());

app.use(cors());
app.use("/", routes);


app.get("/", (req,res) =>{
res.send("Welcome to ecommerce")
})

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`The project is running on PORT ${PORT}.`);
  });