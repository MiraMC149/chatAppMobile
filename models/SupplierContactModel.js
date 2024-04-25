const mongoose = require('mongoose');
const supplierContactSchema = new mongoose.Schema({
    supplierId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Supplier",
        required:false,
    },
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:false,
    },
    phoneNo:{
        type:String,
        required:false,
    },
    addedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    addedAt:{
        type:Date,
        default:Date.now
    },
    statusId:{
        type:Number,
        required:true,
    }
},{
    collection: "SupplierContacts"
},{
    versionKey: false
});
const SupplierContact = mongoose.model("SupplierContact",supplierContactSchema);

module.exports = SupplierContact;