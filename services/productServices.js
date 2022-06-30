const productSchema = require ("../model/product");

exports.createProduct = async (query) => {
    return await productSchema.create(query);
  };
// exports.getProduct = async (query) => {
//     return await productSchema.findOne(query).select("-__v ")
//   };
exports.updateProductStock = async (query, data) => {
    return await productSchema.findOneAndUpdate(query, data, {
      new: true,
    })
  };
exports.deleteProduct = async (query) => {
    return await productSchema.deleteOne(query)
   }   
exports.getProduct = async (query) => {
  return await productSchema.findOne(query).select("-__v ")
};
exports.allProducts = async (query) =>{
  return await productSchema.find(query).select("-__v")
  .populate('seller_id');
}
