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

//endpoint to add order
router.post("/add", async (req, res) => {
    const { supplierId, customerId, description, orderPlacingDate, orderDeliveryDate, status } = req.body;
    if(status==null){
        status=1;
    }
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0'); // Get the day and pad with leading zero if needed
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Get the month (January is 0) and pad with leading zero if needed
    const year = today.getFullYear(); // Get the full year
  
    const addedAt = `${year}-${month}-${day}`; // Format the date as YYYY-MM-DD 
    const addedBy = req.headers['userId'];
    // Check if supplierId and customerId are valid ObjectIDs
    if (!mongoose.Types.ObjectId.isValid(supplierId) || !mongoose.Types.ObjectId.isValid(customerId)) {
      return res.status(400).json({ message: "Invalid supplierId or customerId" });
    }
  
    // Check if the users exist in the Users collection
    const supplierExists = await User.exists({ _id: supplierId });
    const customerExists = await User.exists({ _id: customerId });
  
    if (!supplierExists || !customerExists) {
      return res.status(400).json({ message: "Invalid supplierId or customerId - User not found" });
    }
  
    // Create a new Order object
    const newOrder = new Order({ supplierId, customerId, description, orderPlacingDate, orderDeliveryDate,addedBy,addedAt,statusId});
  
    // Save the new order
    await newOrder.save()
      .then(() => {
        res.status(200).json({ message: "Order registered successfully" });
      })
      .catch((err) => {
        console.log('Error registering order ', err);
        res.status(500).json({ message: "Error registering order" });
      });
  });

  //endpoint to get all orders for the restaurant
    router.get("/resto_orders", (req, res) => {
    const { restoId } = req.headers;
      Order.find({ restoId: restoId }).then((orders) => {
        res.status(200).json({ message: "Orders fetched successfully", data: orders });
      }).catch((err) => {
        console.log('Error fetching Orders', err);
        res.status(500).json({ message: "Error fetching orders" });
      });
    });

module.exports = router;