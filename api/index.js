const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const dotenv = require('dotenv');
const authRoutes = require('../routes/authRoutes')
const productsRoutes = require('../routes/productsRoutes')
const campaignsRoutes = require('../routes/marketingCampaignsRoutes')
const ordersRoutes = require('../routes/ordersRoutes')
const restoRoutes = require('../routes/restoRoutes')
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(passport.initialize());


// Use the Routes middleware
app.use('/auth', authRoutes);
app.use('/product', productsRoutes);
app.use('/campaigns', campaignsRoutes);
app.use('/orders', ordersRoutes);
app.use('/resto', restoRoutes);

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

//endpoint to add supplier
app.post("/add_supplier", async (req,res) => {
  const {name,email,phoneNo,location,picture} = req.body;
  const statusId = 1;
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0'); // Get the day and pad with leading zero if needed
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Get the month (January is 0) and pad with leading zero if needed
  const year = today.getFullYear(); // Get the full year

  const addedAt = `${year}-${month}-${day}`; // Format the date as YYYY-MM-DD 
  const addedBy = req.headers['userId'];
  //Create a new Supplier obj
  const newSupp = new Supplier({name,email,phoneNo,location,picture,addedBy,addedAt,statusId})
  await newSupp.save().then(()=>{
      res.status(200).json({message:"Supplier registered successfully"});
  }).catch((err)=>{
      console.log('Error registering supplier ',err);
      res.status(500).json({message:"Error registering supplier"});

  })
});

//endpoint to add role
app.post("/add_role", async (req,res) => {
  const {name} = req.body;
  const statusId = 1;
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0'); // Get the day and pad with leading zero if needed
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Get the month (January is 0) and pad with leading zero if needed
  const year = today.getFullYear(); // Get the full year

  const addedAt = `${year}-${month}-${day}`; // Format the date as YYYY-MM-DD 
  const addedBy = req.headers['userId'];
  //Create a new Role obj
  const newRole = new Role({name,addedBy,addedAt,statusId})
  await newRole.save().then(()=>{
      res.status(200).json({message:"Role registered successfully"});
  }).catch((err)=>{
      console.log('Error registering role ',err);
      res.status(500).json({message:"Error registering role"});

  })
});





//endpoint to add team
app.post("/add_team", async (req,res) => {
  const {name,location,members,picture} = req.body;
  const statusId = 1;
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0'); // Get the day and pad with leading zero if needed
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Get the month (January is 0) and pad with leading zero if needed
  const year = today.getFullYear(); // Get the full year

  const addedAt = `${year}-${month}-${day}`; // Format the date as YYYY-MM-DD 
  const addedBy = req.headers['userId'];
  //Create a new Team obj
  const newTeam = new Team({name,location,members,picture,addedBy,addedAt,statusId})
  await newTeam.save().then(()=>{
      res.status(200).json({message:"Team registered successfully"});
  }).catch((err)=>{
      console.log('Error registering team ',err);
      res.status(500).json({message:"Error registering team"});

  })
});
