const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
   // userId:{
     //   type:Number,
     //   startsAt:1,
     //   unique:true,
     //   autoIncrement:true,
    //},
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
    restoId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Resto",
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
},{
    collection:"Users"
},
{
    versionKey: false
});

const Users = mongoose.model("Users",userSchema);

module.exports = Users;