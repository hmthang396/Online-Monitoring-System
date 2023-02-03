const mongoose = require("mongoose");
const { Schema } = mongoose;
const methodSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        require:true,
    },
    description:{
        type:String,
        trim:true,
    },
    method:{
        type:String,
        enum:['OPCUA','Modbus','ADS','Ethernet/IP','MQTT'],
        require:true,
        unique:true
    }
},
{
    timestamps : true   
});

const Method = mongoose.model("Method",methodSchema);
module.exports = Method;