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
    statusId:{
        type:Number,
        required:true,
    },
    ProductTypes_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"ProductType",
        required:false,
    },
},{
    collection: "Products"
},{
    versionKey: false
});
const Product = mongoose.model("Product",productSchema);

module.exports = Product;