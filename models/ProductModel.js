const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    //productId:{
      //  type:Number,
        
    //},
    name:{
        type:String,
        required:true,
    },
    picture:{
        type:String,
        required:false,
    },
    unit:{
        type:String,
        required:true,
    },
    statusId:{
        type:Number,
        required:true,
    },
    ProductTypes_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"ProductType",
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
    }
},{
    collection: "Products"
},{
    versionKey: false
});
const Product = mongoose.model("Product",productSchema);

module.exports = Product;