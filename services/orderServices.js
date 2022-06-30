const orderSchema = require ("../model/order");

exports.createOrder = async (query) => {
    return await orderSchema.create(query);
  };
exports.getOrder = async (query) => {
    return await orderSchema.findOne(query).select("-__v ")
  };
exports.updateOrderStatus = async (query, data) => {
    return await orderSchema.findOneAndUpdate(query, data, {
      new: true,
    })
  };
exports.deleteOrder = async (query) => {
    return await orderSchema.deleteOne(query)
   }   
exports.allOrders = async (query) =>{
  // console.log(query);
  return await orderSchema.find(query).select("-__v ").populate("product_id")
}

