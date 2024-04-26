const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
   // userId:{
     //   type:Number,
     //   startsAt:1,
     //   unique:true,
     //   autoIncrement:true,
    //},
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
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
    username:{
        type:String,
        required:true,
    },
    typeId:{
        type: Number,
        required:true,
    },
    roleId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Role",
        required:false,
    },
    accessRoleId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"AccessRole",
        required:false,
    },
    teamId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Team",
        required:false,
    },
    //restoId:{
      //  type:mongoose.Schema.Types.ObjectId,
      //  ref:"Resto",
      //  required:false,
    //},
    picture:{
        type:String,
        required:false,
    },
    statusId:{
        type:Number,
        required:true,
    },
    addedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userId",
        required:false,
    },
    addedAt:{
        type:Date,
        default:Date.now
    },
},{
    collection:"Users"
},
{
    versionKey: false
});

const Users = mongoose.model("Users",userSchema);

module.exports = Users;