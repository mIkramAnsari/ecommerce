const orderServices = require("../services/orderServices")
const productServices = require("../services/productServices")
require('../config/database');
require('mongoose');
const {
    successResponse,
    outOfStock,
    validationErrorResponse,
  } = require("../utils/response");
  const messageUtil = require("../utils/message");

class Order{
    placingOrder = async (req, res) =>{
      let product_id = req.params.id
      const quantity = req.body.quantity;
      // console.log(quantity);
      let product = await productServices.getProduct({product_id});
      let seller_id = product.seller_id;
      let product_stock = product.stock;
      // console.log(product_stock);
      if (quantity > product_stock) {
        return outOfStock(res, messageUtil.outOfStock );
      }h
      const order = await orderServices.createOrder({
          product_id,
          buyer_id: req.userId,
          seller_id,
          quantity
        });
        return successResponse(res, messageUtil.orderPending, order);
    };
    orders = async (req, res) =>{
      let orders = await orderServices.allOrders();
      if(orders){
        return successResponse(res, messageUtil.ok, orders);
      }
    }
} 
module.exports = new Order();