const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;


const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());
const jwt = require("jsonwebtoken");


mongoose.connect("",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}.then(()=>{
    console.log('Connected');
}).catch((err)=>{
    console.log('Error connecting: ', err)
})
);

app.listen(port, ()=>{
    console.log("Running on port", port);
})

const User = require('../models/UserModel');
const Team = require('../models/TeamModel');
const Supplier = require('../models/SupplierModel');
const Role = require('../models/RoleModel');
const ProductType = require('../models/ProductTypeModel');
const Product = require('../models/ProductModel');
const Order = require('../models/OrderModel');
// script start "expo start --dev-client",

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
