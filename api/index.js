const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
app.use(cors());


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());
const jwt = require("jsonwebtoken");


const connectToMongoDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      console.log('Connected to MongoDB');
  
      // Event listeners
      mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
      });
  
      mongoose.connection.on('disconnected', () => {
        console.log('MongoDB disconnected');
      });
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
    }
  };
  

app.listen(port, ()=>{
    connectToMongoDB();
    console.log("Running on port", port);
})

const User = require('../models/UserModel');
const Team = require('../models/TeamModel');
const Resto = require('../models/RestaurantModel');
const Supplier = require('../models/SupplierModel');
const Role = require('../models/RoleModel');
const ProductType = require('../models/ProductTypeModel');
const Product = require('../models/ProductModel');
const Order = require('../models/OrderModel');

//endpoint for user registration
app.post("/registration", (req,res) => {
    const {name,email,password,phoneNo,picture} = req.body;
    const status = 1;
    //Create a new user obj
    const newUser = new User({name,password,email,phoneNo,picture,status})
    newUser.save().then(()=>{
        res.status(200).json({message:"User registered successfully"});
    }).catch((err)=>{
        console.log('Error registering user ',err);
        res.status(500).json({message:"Error registering the user"});

    })
})

//endpoint for user login
app.post("/sign_in", (req,res) => {
  const {email,password} = req.body;
  User.findOne({email, password}).then((user) => {
    if (user) {
      res.status(200).json({message: "User logged in successfully", data: user});
    } else {
      res.status(401).json({message: "Invalid email or password"});
    }
  }).catch((err) => {
    console.log('Error logging in user ', err);
    res.status(500).json({message: "Error logging in the user"});
  });
});

//endpoint to get all products
app.post("/product_by_category", (req,res) => {
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

//endpoint to get all suppliers
app.get("/all_suppliers", (req,res) => {
  Product.find().then((suppliers) => {
    if (suppliers.length > 0) {
      res.status(200).json({message: "Suppliers fetched successfully", data: suppliers});
    } else {
      res.status(401).json({message: "No suppliers found"});
    }
  }).catch((err) => {
    console.log('Error fetching products', err);
    res.status(500).json({message: "Error fetching suppliers"});
  });
});

//endpoint to get all users
app.get('/all_users', async (req, res) => {
  try {
      const dogs = await User.find();
      res.json(dogs);
  } catch(e) {
      res.json(e)
  }
});
/*app.get("/all_users", async (req,res) => {
  const d = await User.find({}).then((users) => {
    if (users.length > 0) {
      res.status(200).json({message: "Users fetched successfully", data: users});
    } else {
      console.log("No users found", d);
      res.status(401).json({message: "No users found"});
    }
  }).catch((err) => {
    console.log('Error fetching products', err);
    res.status(500).json({message: "Error fetching users"});
  });
});*/

//endpoint to get all suppliers for the restaurant
app.get("/resto_suppliers", (req, res) => {
  const { restoId } = req.params;

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

//endpoint to get all orders for the restaurant
app.get("/resto_orders", (req, res) => {
  const { restoId } = req.params;
    Order.find({ restoId: restoId }).then((orders) => {
      res.status(200).json({ message: "Orders fetched successfully", data: orders });
    }).catch((err) => {
      console.log('Error fetching Orders', err);
      res.status(500).json({ message: "Error fetching orders" });
    });
  });

//endpoint to get all the user's team members if they are a general manager or owner
app.get("/team_members", (req, res) => {
  const { userId, teamId } = req.params;

  User.findById(userId).then((user) => {
    if (!user) {
      return res.status(404).json({ message: "Error fetching members" });
    }

    if (user.roleId === 1 || user.roleId === 2) {
      User.find({ teamId: user.teamId }).then((members) => {
        res.status(200).json({ message: "Members fetched successfully", members: members });
      }).catch((err) => {
        console.log('Error fetching members', err);
        res.status(500).json({ message: "Error fetching members" });
      });
    } else {
      res.status(403).json({ message: "User does not have permission to access members" });
    }
  }).catch((err) => {
    console.log('Error finding User', err);
    res.status(500).json({ message: "Error fetching members" });
  });
});

/*app.post('/send-message', async (req, res) => {
    try {
      const zapierWebhookUrl = 'https://hooks.zapier.com/hooks/catch/18470908/3pw05jp/'; // Replace with your actual Zapier Webhooks URL
  
      const requestData = {
        phoneNumber: '+96171119085',
        //req.body.phoneNumber,
        message: 'Test message',
        //req.body.message,
      };
  
      const response = await axios.post(zapierWebhookUrl, requestData);
  
      console.log('Message sent successfully:', response.data);
      res.status(200).json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
      console.error('Error triggering Zap:', error);
      res.status(500).json({ success: false, message: 'Failed to send message' });
    }
  });
  */


