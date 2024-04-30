const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  //  orderId:{
    //    type:Number,
        
    //},
    supplierId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Supplier",
        required:true,
    },
    restoId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Branch",
        required:true,
    },
    description:{
        type:String,
        required:false,
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
    orderDeliveryDate:{
        type:String,
        required:true,
    },
    products:{
        type:Array,
        required:true,
    },
    isDelivered:{
        type:Number,
        required:true,
    },
    statusId:{
        type:Number,
        required:true,
    }
},{
    collection: "Orders"
},{
    versionKey: false
});
const Order = mongoose.model("Order",orderSchema);

module.exports = Order;