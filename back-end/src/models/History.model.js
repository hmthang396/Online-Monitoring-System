const mongoose = require("mongoose");
const { Schema } = mongoose;
const historySchema = mongoose.Schema({
    value:{
        type:String,
        trim:true,
    },
    nodeId:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"Node",
    },
    time:{
        type:mongoose.Schema.Types.Date,
    }
},
{
    timestamps : true   
});
const History = mongoose.model("History",historySchema);
module.exports = History;