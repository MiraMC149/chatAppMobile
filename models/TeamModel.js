const mongoose = require('mongoose');
const teamSchema = new mongoose.Schema({
    teamId:{
        type:Number,
        startsAt:1,
        autoIncrement:true,
    },
    name:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    members:{
        type:Int32Array,
        required:true,
    },
    picture:{
        type:String,
        required:false,
    },
    statusId:{
        type:Number,
        required:true,
    },
})
//team=restaurant
const Team = mongoose.model("Team",teamSchema);

module.exports = Team;