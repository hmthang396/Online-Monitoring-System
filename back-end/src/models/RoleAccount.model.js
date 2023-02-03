const mongoose = require("mongoose");
const { Schema } = mongoose;
const roleAccountSchema = mongoose.Schema({
    read:{
        type:Boolean,
        default:true
    },
    write:{
        type:Boolean,
        default:false
    }
},
{
    timestamps : true   
});

const RoleAccount = mongoose.model("RoleAccount",roleAccountSchema);
module.exports = RoleAccount;