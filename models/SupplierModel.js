const mongoose = require('mongoose');
const supplierSchema = new mongoose.Schema({
    supplierId:{
        type:Number,
        startsAt:1,
        autoIncrement:true,
    },
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
    picture:{
        type:String,
        required:false,
    },
    statusId:{
        type:Number,
        required:true,
    },
});

const Supplier = mongoose.model("Supplier",supplierSchema);

module.exports = Supplier;