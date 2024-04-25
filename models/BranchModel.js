const mongoose = require('mongoose');
const branchSchema = new mongoose.Schema({
    restoId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Resto",
        required:false,
    },
    city:{
        type:String,
        required:true,
    },
    street:{
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
    collection: "RestaurantBranches"
},{
    versionKey: false
});
const Branch = mongoose.model("Branch",branchSchema);

module.exports = Branch;