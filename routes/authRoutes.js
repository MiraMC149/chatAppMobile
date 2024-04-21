const express = require('express');
const router = express.Router();

const User = require('../models/UserModel');

//endpoint for user registration
router.post("/registration", (req,res) => {
    const {name,email,password,phoneNo,picture,status} = req.body;
    if(status==null){
        status=1;
    }
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
router.post("/sign_in", (req,res) => {
console.log('req.body',req.body)
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

//endpoint to get all users
router.get("/all_users", async (req,res) => {
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

module.exports = router;