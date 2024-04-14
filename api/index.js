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
        res.status(500).json({message:"Error registering user"});

    })
})

//endpoint for user login
app.get("/sign_in", (req,res) => {
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
app.get("/product_by_category", (req,res) => {
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
app.get("/all_users", async (req,res) => {
  await User.find({}).then((users) => {
    if (users.length > 0) {
      res.status(200).json({message: "Users fetched successfully", data: users});
    } else {
      res.status(200).json({message: "No users found"});
    }
  }).catch((err) => {
    console.log('Error fetching products', err);
    res.status(500).json({message: "Error fetching users"});
  });
});

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

//endpoint to add resto
app.post("/add_resto", async (req,res) => {
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

//endpoint to add product
app.post("/add_product", async (req,res) => {
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

//endpoint to add product type
app.post("/add_productType", async (req,res) => {
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

//endpoint to add order
app.post("/add_order", async (req, res) => {
  const { supplierId, customerId, description, orderPlacingDate, orderDeliveryDate } = req.body;
  const statusId = 1;
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