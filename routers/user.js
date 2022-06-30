var express = require("express");
const User = require("../controllers/userController");
const  {checkToken} = require("../utils/tokenAuth");
var router = express.Router();

router.post("/register", User.register);
router.post("/login", User.login);
//for protected routes Creating a middle ware for user authentication
router.get("/auth", checkToken, User.userAuth);
router.get("/orders", checkToken, User.getOrdersBySellerToken)
router.post("/updateStatus/:id", checkToken, User.updateOrderStatus)
router.get("/carts",checkToken,User.carts),
//remove cart by product id
router.post("/removeCart/:id", checkToken,User.removeCart);


module.exports = router;