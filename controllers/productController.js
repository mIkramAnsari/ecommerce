const productServices = require("../services/productServices")
const userServices = require("../services/userServices")
bodyParser = require('body-parser'),
jsonParser = bodyParser.json();
const productSchema = require("../model/product");

const checkFields = require("../utils/checkFields");
const {
  successResponse,
  existAlreadyResponse,
  serverErrorResponse,
  notFoundResponse,
} = require("../utils/response");
const messageUtil = require("../utils/message");
const { serverError } = require("../utils/message");

class Product{
    addProduct = async (req, res) => {
      const { name, price, stock} = req.body;  
        // console.log({seller_id});
        //console.log(name);
        const isError = checkFields(
          {
            name,
            price,
            stock
          },
          res
        );
        if (isError) return;

        let product = await productServices.getProduct({ name });
        if (product) {
          return existAlreadyResponse(res, messageUtil.productAlreadyExist);
        }
        // product = new Product({ name, price, stock, seller_id})
        product = await productServices.createProduct({
          ...req.body,
          seller_id: req.userId,
        });
        // await product.save();
        return successResponse(res, messageUtil.ok, product);
    };
   
    allProductsForSeller = async (req , res) =>{
      // const seller_id = req.userId;
      let products = await productServices.allProducts({seller_id : req.userId});
      if(products){
        res.send({products});
        }
    };
    updateProduct = async (req, res) => {
      let stock = req.body.stock;
      let _id = req.params.id;
      const isError = checkFields(
        {
          stock,
        },
        res
      );
      if (isError) return;

      const productExist = await productServices.updateProductStock({ _id }, { stock });
      if(productExist){
        // res.send({message: "stock updated successfully"});
        return successResponse(res, messageUtil.ok, productExist);
      }  
    }
    
    addToCart = async (req, res) => {
      const {id} = req.params;
       const _id = req.userId;
      let user = await userServices.updateUser({_id}, { $push: { cart: id} })
      if(user)
      return successResponse(res, messageUtil.ok);
    }

    getProductById = async (req, res) => { 
      let _id = req.params.id
      console.log({_id})
      // const {prodId} = req.params
      let product ;
      try{
        product = await productServices.getProduct({_id});
        if (!product) {
          // res.send({products});
          notFoundResponse(res, messageUtil.NotFound);
        }
        else{
           successResponse(res, messageUtil.ok, product);
        }
      }catch (err){
        serverErrorResponse(res, err)
      }

      } 

    products = async (req,res) =>{
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
        const products = await productSchema.find().skip(skip).sort(
            { votes: 1, _id: 1 }).limit(size)
            const noOfProducts = await productSchema.count();
        res.send({
            noOfProducts,
            page,
            limit,
            data: products,
        });
    }catch (error) {
        serverErrorResponse(res, error)
      }
    }; 
};
module.exports = new Product();