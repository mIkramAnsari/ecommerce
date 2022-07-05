const orderServices = require("../services/orderServices")
const productServices = require("../services/productServices")
const orderSchema = require("../model/order")
require('../config/database');
require('mongoose');
const {
    successResponse,
    outOfStock,
    serverErrorResponse,
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
      try {
        let { limit ,page } = req.query;
        if (!page) {
            page = 1;
        }
        if (!limit) {
            limit = 3;
        }
        const size = parseInt(limit);
        page = parseInt(page);
        let skip = (page - 1) * size;
        const Orders = await orderSchema.find().skip(skip).sort(
            { votes: 1, _id: 1 }).limit(size)
            const noOfOrders = await orderSchema.count();
        res.send({
            noOfOrders,
            page,
            limit,
            data: Orders,
        });
    }catch (error) {
        return serverErrorResponse(res, error)
      }
    }
} 
module.exports = new Order();