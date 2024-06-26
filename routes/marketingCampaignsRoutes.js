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
const MarketingCampaign = require('../models/MarketingCampaignModel');

//endpoint to get all marketing campaigns for the supplier
router.get("/Get/Marketing_Campaigns", (req, res) => {
    const { supplierId } = req.headers;
    MarketingCampaign.find({ supplierId: supplierId }).then((campaigns) => {
        res.status(200).json({ message: "Campaigns fetched successfully", data: campaigns });
      }).catch((err) => {
        console.log('Error fetching campaigns', err);
        res.status(500).json({ message: "Error fetching campaigns" });
      });
    });

//endpoint to add/edit a supplier's marketing campaigns
router.post("/Add/Marketing_Campaigns", (req, res) => {
    const { userId } = req.headers;
    const { supplierId, productCategoriesId, title, message, promotionPercentage, endDate, statusId } = req.body;
    if(status==null){
        status=1;
    };
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0'); // Get the day and pad with leading zero if needed
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Get the month (January is 0) and pad with leading zero if needed
    const year = today.getFullYear(); // Get the full year

    const addedAt = `${year}-${month}-${day}`; // Format the date as YYYY-MM-DD 
    const addedBy = userId;

    const newMarketingCampaign = new MarketingCampaign({ supplierId, productCategoriesId, title, message, promotionPercentage, endDate, addedBy, addedAt, statusId });
    newMarketingCampaign.save().then(() => {
        res.status(200).json({ message: "Campaign registered successfully" });
    }).catch((err) => {
        console.log('Error registering campaign ', err);
        res.status(500).json({ message: "Error registering campaign" });
    });
});

module.exports = router;