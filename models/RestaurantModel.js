const mongoose = require('mongoose');
const restoSchema = new mongoose.Schema({
    //restoId:{
      //  type:Number,
      //  startsAt:1,
      //  autoIncrement:true,
    //},
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:false,
        unique:true,
    },
    phoneNo:{
        type:String,
        required:false,
    },
    location:{
        type:String,
        required:false,
    },
    suppliers:{
        type:Array,
        required:true,
    },
    isCentralKitchen:{
        type:Boolean,
        ref:"Role",
        required:false,
    },
    ownerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
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
    collection: "Restaurants"
},{
    versionKey: false
});

const Resto = mongoose.model("Resto",restoSchema);

module.exports = Resto;