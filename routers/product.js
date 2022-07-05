var express = require("express");
const Product = require("../controllers/productController");
const {checkToken} = require("../utils/tokenAuth");

var router = express.Router();

// router.post("/addProduct/:id", Product.addProduct); Seller
router.post("/addProduct", checkToken,Product.addProduct);
router.get("/allSellerProducts", checkToken ,Product.allProductsForSeller);
router.get("/productDetails/:id", Product.getProductById);
router.get("/products", Product.products);
router.post("/updateProduct/:id", checkToken, Product.updateProduct)

// buyer can perform related to cart
router.post("/addToCart/:id", checkToken,Product.addToCart);
module.exports = router;