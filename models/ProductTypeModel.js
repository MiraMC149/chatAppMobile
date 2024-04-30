const mongoose = require('mongoose');
const productTypeSchema = new mongoose.Schema({
    //productTypeId:{
   //     type:Number,
   //     
    //},
    name:{
        type:String,
        required:true,
    },
    statusId:{
        type:Number,
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
},{
    collection: "Product Types"
},{
    versionKey: false
});
const ProductType = mongoose.model("ProductType",productTypeSchema);

module.exports = ProductType;