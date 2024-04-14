const mongoose = require('mongoose');
const productTypeSchema = new mongoose.Schema({
    productTypeId:{
        type:Number,
        
    },
    name:{
        type:String,
        required:true,
    },
    statusId:{
        type:Number,
        required:true,
    },
},{
    collection: "Product Types"
});
const ProductType = mongoose.model("ProductType",productTypeSchema);

module.exports = ProductType;