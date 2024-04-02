const mongoose = require('mongoose');
const roleSchema = new mongoose.Schema({
    roleId:{
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
});
const Role = mongoose.model("Role",roleSchema);

module.exports = Role;