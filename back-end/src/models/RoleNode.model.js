const mongoose = require("mongoose");
const roleNodeSchema = mongoose.Schema({
    read:{
        type:Boolean,
    },
    write:{
        type:Boolean,
    },
    history:{
        type:Boolean,
    },
},
{
    timestamps : true   
});

const RoleNode = mongoose.model("RoleNode",roleNodeSchema);
module.exports = RoleNode;