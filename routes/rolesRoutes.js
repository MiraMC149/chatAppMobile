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
const AccessRole = require('../models/AccessRoleModel');
const MarketingCampaign = require('../models/MarketingCampaignModel');

//endpoint to get all user's role
router.get("/Get/Role", (req, res) => {
    const { userId } = req.headers;
    Role.find({ userId: userId }).then((role) => {
        res.status(200).json({ message: "Role fetched successfully", data: role });
      }).catch((err) => {
        console.log('Error fetching role', err);
        res.status(500).json({ message: "Error fetching role" });
      });
    });

//endpoint to add/edit an access role
router.post("/Add/Role", (req, res) => {
    const { roleId, userId } = req.headers;
    const { name, statusId } = req.body;
    if(status==null){
        status=1;
    };
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0'); // Get the day and pad with leading zero if needed
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Get the month (January is 0) and pad with leading zero if needed
    const year = today.getFullYear(); // Get the full year

    const addedAt = `${year}-${month}-${day}`; // Format the date as YYYY-MM-DD 
    const addedBy = userId;

    const newAccessRole = new AccessRole({ name, accessRoleId, addedBy, addedAt, statusId });
    newAccessRole.save().then(() => {
        res.status(200).json({ message: "Role added successfully" });
    }).catch((err) => {
        console.log('Error registering role ', err);
        res.status(500).json({ message: "Error registering role" });
    });
});

module.exports = router;