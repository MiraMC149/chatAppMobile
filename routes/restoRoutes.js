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


//endpoint to add resto
router.post("/add_resto", async (req,res) => {
    const {name,email,phoneNo,location,suppliers,isCentralKitchen,ownerId,picture} = req.body;
    const statusId = 1;
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0'); // Get the day and pad with leading zero if needed
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Get the month (January is 0) and pad with leading zero if needed
    const year = today.getFullYear(); // Get the full year
  
    const addedAt = `${year}-${month}-${day}`; // Format the date as YYYY-MM-DD 
    const addedBy = req.headers['userId'];
    //Create a new restaurant obj
    const newResto = new Resto({name,email,phoneNo,location,suppliers,isCentralKitchen,ownerId,picture,addedBy,addedAt,statusId})
    await newResto.save().then(()=>{
        res.status(200).json({message:"Restaurant registered successfully"});
    }).catch((err)=>{
        console.log('Error registering restaurant ',err);
        res.status(500).json({message:"Error registering restaurant"});
  
    })
  });

//endpoint to get all suppliers for the restaurant
router.get("/resto_suppliers", (req, res) => {
    const { restoId } = req.headers;
  
    Resto.findById(restoId).then((resto) => {
      if (!resto) {
        return res.status(404).json({ message: "Error fetching suppliers" });
      }
  
      const supplierIds = resto.suppliers;
      Supplier.find({ supplierId: { $in: supplierIds } }).then((suppliers) => {
        res.status(200).json({ message: "Suppliers fetched successfully", data: suppliers });
      }).catch((err) => {
        console.log('Error fetching suppliers', err);
        res.status(500).json({ message: "Error fetching suppliers" });
      });
    }).catch((err) => {
      console.log('Error finding Resto', err);
      res.status(500).json({ message: "Error finding suppliers" });
    });
  });

  module.exports = router;