var express = require("express");

const userRouter = require("./user");
const productRouter = require("./product")
const orderRouter = require("./order")
var router = express.Router();

router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/order", orderRouter);

module.exports = router;
