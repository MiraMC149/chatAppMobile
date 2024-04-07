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


app.post('/send-message', async (req, res) => {
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
