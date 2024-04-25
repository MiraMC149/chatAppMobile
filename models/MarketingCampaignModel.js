const mongoose = require('mongoose');
const marketingCampaignSchema = new mongoose.Schema({
  //  orderId:{
    //    type:Number,
        
    //},
    supplierId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Supplier",
        required:true,
    },
    productCategoriesId:{
        type:Array,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,
    },
    promotionPercentage:{
        type:Number,
        required:true,
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
    endDate:{
        type:Date,
        default:Date.now
    },
    statusId:{
        type:Number,
        required:true,
    }
},{
    collection: "MarketingCampaigns"
},{
    versionKey: false
});
const marketingCampaigns = mongoose.model("MarketingCampaign",marketingCampaignSchema);

module.exports = marketingCampaigns;