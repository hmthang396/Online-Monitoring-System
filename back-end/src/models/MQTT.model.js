const mongoose = require("mongoose");
const { Schema } = mongoose;
const mqttSchema = mongoose.Schema({
    topic:{
        type:String,
    },
    value:{
        type:String,
    },
},
{
    timestamps : true   
});

const Mqtt = mongoose.model("Mqtt",mqttSchema);
module.exports = Mqtt;