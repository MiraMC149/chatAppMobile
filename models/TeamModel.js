const mongoose = require('mongoose');
const teamSchema = new mongoose.Schema({
    //teamId:{
     //   type:Number,
     //   startsAt:1,
     //   autoIncrement:true,
    //},
    name:{
        type:String,
        required:true,
    },
    members:{
        type:Array,
        required:true,
    },
    addedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    addedAt:{
        type:String,
        required:true,
    },
    branchId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Branch",
        required:true,
    },
    statusId:{
        type:Number,
        required:true,
    },
},{
    collection: "Teams"
},{
        versionKey: false
    });
//team=restaurant
const Team = mongoose.model("Team",teamSchema);

module.exports = Team;