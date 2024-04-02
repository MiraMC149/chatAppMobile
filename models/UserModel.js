const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    userId:{
        type:Number,
        startsAt:1,
        autoIncrement:true,
    },
    name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phoneNo:{
        type:String,
        required:true,
    },
    roleId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Role",
        required:false,
    },
    teamId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Team",
        required:false,
    },
    picture:{
        type:String,
        required:false,
    },
    statusId:{
        type:Number,
        required:true,
    },
});

const User = mongoose.model("User",userSchema);

module.exports = User;