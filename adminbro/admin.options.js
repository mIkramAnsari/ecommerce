const AdminJS = require("adminjs");
const AdminJSMongoose = require("@adminjs/mongoose");
// const uploadFeature = require("@adminjs/upload");
AdminJS.registerAdapter(AdminJSMongoose);
require("dotenv").config();

const user = require("../model/user");
const product = require("../model/product");
const order = require("../model/order");

const locale = {
  translations: {
    labels: {
      // change Heading for Login
      loginWelcome: "E-Commerce",
    },
    messages: {
      loginWelcome: "Welcome to E-commerce Admin panel",
    },
  },
};

const options = {
  locale,
  resources: [
    user , order, product
  ],
  dashboard: {
    component: AdminJS.bundle("./myDashboardComponent"),
  },
  branding: {
    companyName: "E-Commerce",
    softwareBrothers: false,
    logo: "",
  },
};

module.exports = options;