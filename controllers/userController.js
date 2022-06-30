const UserServices = require("../services/userServices");
const orderServices = require("../services/orderServices");
const productServices = require("../services/productServices");
const checkFields = require("../utils/checkFields");
const mailer = require("../utils/emailSender");
const {
  successResponse,
  notFoundResponse,
  serverErrorResponse,
  existAlreadyResponse,
  authorizationErrorResponse,
} = require("../utils/response");
const jwtHelper = require("../utils/jwt");
const messageUtil = require("../utils/message");


const { bcryptHash, comparePassword } = require("../utils/passwordUtils");

class User {
  register = async (req, res) => {
    const { name, email, phone , password,user_type} = req.body;
    
    // let to = email;
    const isError = checkFields(
      {
        email,
        password,
      },
      res
    );
    if (isError) return;

    let user = await UserServices.getUser({ email });
    if (user) {
      // mailer.emailSender(to);
      return existAlreadyResponse(res, messageUtil.emailAlreadyExist);
    }
    
    user = await UserServices.createUser({
      ...req.body,
    //   name: username,
    });
    user.password = await bcryptHash(password);
    await user.save();
    // mailer.emailSender(to);
    return successResponse(res, messageUtil.ok, user);
  };

  login = async (req, res) => {
    const { email, password } = req.body;
    const isError = checkFields(
      {
        email,
        password,
      },
      res
    );
    if (isError) return;
    let user;
    try {
      user = await UserServices.getUserForLogin({ email }); // getting password for comparison
      console.log({user});
      if (!user) {
        return notFoundResponse(res, messageUtil.NotFound);
      } 
        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
          return authorizationErrorResponse(res, messageUtil.incorrectPassword);
        }
        user = await UserServices.getUser({_id :user._id}); // removing password for sending in response
        const token = jwtHelper.issue({ id: user._id });
        return successResponse(res, messageUtil.userLogin, user , token);
      
    } catch (err) {
      serverErrorResponse(res, err);
    }
  };
  
  userAuth = async (req,res) => {
    let user;
    try {
      user = await UserServices.getUser({ _id: req.userId });
      if (!user) {
        notFoundResponse(res, messageUtil.NotFound);
      } else {
        // const token = jwtHelper.issue({ id: user._id });
        successResponse(res, messageUtil.ok, user);
      }
    } catch (err) {
      serverErrorResponse(res, err);
    }
  };
  
  getOrdersBySellerToken = async (req, res) =>{
    let orders = await orderServices.allOrders({seller_id : req.userId});
    if(orders){
      return successResponse(res, messageUtil.ok, orders);
    }
  }
  updateOrderStatus = async (req, res) => {
    let _id = req.params.id;
    let status = req.body.status;
    let state = await orderServices.getOrder({_id});
    // console.log(state);
    if (state.status == status) {
      return existAlreadyResponse(res, messageUtil.alreadyApproved)
      // console.log(`status already approved`);
    }
    let order = await orderServices.updateOrderStatus({_id} , {status});
    // console.log(order)
    if(!order){
      return notFoundResponse(res, messageUtil.NotFound);
    }
    // console.log(order.status)
    // order.status = status;
    
    return successResponse(res, messageUtil.orderupdated, order);  
  }
  carts = async (req, res) => {
    let _id = req.userId;
    let cart = await UserServices.getUser({_id});
    if(cart){
      res.send(cart);
    }
  }
  removeCart = async (req, res) =>{
    const {id} = req.params;
    const _id = req.userId;
    // console.log({_id});
    let user = await UserServices.updateUser({_id}, { $pull: { cart: id} })
    if(!user){
      res.send({message : "couldn't perform remove cart operations"})
    }
    return successResponse(res, messageUtil.ok);
  };

};  

module.exports = new User();

