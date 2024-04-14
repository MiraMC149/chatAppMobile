const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    orderId:{
        type:Number,
        
    },
    supplierId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"supplierId",
        required:false,
    },
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userId",
        required:false,
    },
    description:{
        type:String,
        required:true,
    },
    orderPlacingDate:{
        type:Date,
        default:Date.now
    },
    orderDeliveryDate:{
        type:Date,
        default:Date.now
    },
},{
    collection: "Orders"
});
const Order = mongoose.model("Order",orderSchema);

module.exports = Order;