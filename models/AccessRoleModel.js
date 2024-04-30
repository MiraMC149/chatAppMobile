const mongoose = require('mongoose');
const accessRoleSchema = new mongoose.Schema({
    //roleId:{
    //    type:Number,
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
    addedAt:{
        type:String,
        required:true,
    },
    addedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
},{
    collection: "Roles"
},{
    versionKey: false
});
const AccessRole = mongoose.model("AccessRole",accessRoleSchema);

module.exports = AccessRole;