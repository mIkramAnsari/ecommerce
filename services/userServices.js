const { query } = require("express");
const userSchema = require ("../model/user");

exports.createUser = async (query) => {
    return await userSchema.create(query);
  };
exports.getUser = async (query) => {
    return await userSchema.findOne(query).populate("cart")
    .select("-__v -password");
  };
exports.getUserForLogin = async (query) => {
    return await userSchema.findOne(query).select("-__v ");
  };  
exports.updateUser = async (query, data) => {
    return await userSchema.findOneAndUpdate(query, data, {
      new: true,
    })
  };
exports.deleteUser = async (query) => {
    return await userSchema.deleteOne(query)
   }   
exports.allUsers = async (query) =>{
    return await userSchema.find().select("_v -password");
}
