const express = require('express');
const router = express.Router();

const User = require('../models/UserModel');
const Team = require('../models/TeamModel');
const Resto = require('../models/RestaurantModel');
const Supplier = require('../models/SupplierModel');
const Role = require('../models/RoleModel');
const ProductType = require('../models/ProductTypeModel');
const Product = require('../models/ProductModel');
const Order = require('../models/OrderModel');

//endpoint to get all products
router.get("/products", (req,res) => {
    Product.find({}).then((products) => {
      if (products.length > 0) {
        res.status(200).json({message: "Products fetched successfully", data: products});
      } else {
        res.status(401).json({message: "No products found"});
      }
    }).catch((err) => {
      console.log('Error fetching products', err);
      res.status(500).json({message: "Error fetching products"});
    });
  });
  
  //endpoint to get all products by category
  router.get("/product_by_category", (req,res) => {
    const {productCategory} = req.body;
    Product.find({productTypeId: productCategory}).then((products) => {
      if (products.length > 0) {
        res.status(200).json({message: "Products fetched successfully", data: products});
      } else {
        res.status(401).json({message: "No products found"});
      }
    }).catch((err) => {
      console.log('Error fetching products', err);
      res.status(500).json({message: "Error fetching products"});
    });
  });

  //endpoint to add product
  router.post("/add_product", async (req,res) => {
    const {name,picture,ProductTypes_id} = req.body;
    const statusId = 1;
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0'); // Get the day and pad with leading zero if needed
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Get the month (January is 0) and pad with leading zero if needed
    const year = today.getFullYear(); // Get the full year
  
    const addedAt = `${year}-${month}-${day}`; // Format the date as YYYY-MM-DD 
    const addedBy = req.headers['userId'];
    //Create a new Product obj
    const newProduct = new Product({name,picture,ProductTypes_id,addedBy,addedAt,statusId})
    await newProduct.save().then(()=>{
        res.status(200).json({message:"Product registered successfully"});
    }).catch((err)=>{
        console.log('Error registering product ',err);
        res.status(500).json({message:"Error registering product"});
  
    })
  });
  
  //endpoint to add product type
router.post("/add_productType", async (req,res) => {
    const {name} = req.body;
    const statusId = 1;
    //Create a new Product Type obj
    const newProductType = new ProductType({name,statusId})
    await newProductType.save().then(()=>{
        res.status(200).json({message:"Product type registered successfully"});
    }).catch((err)=>{
        console.log('Error registering product type ',err);
        res.status(500).json({message:"Error registering product type"});
  
    })
  });

  module.exports = router;