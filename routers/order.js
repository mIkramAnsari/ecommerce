var express = require("express");
const Order = require("../controllers/orderController");
const  {checkToken} = require("../utils/tokenAuth");

var router = express.Router();

router.post("/placingOrder/:id", checkToken,Order.placingOrder);
router.get("/allOrders",Order.orders);



module.exports = router;