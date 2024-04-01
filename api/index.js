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

// script start "expo start --dev-client",
