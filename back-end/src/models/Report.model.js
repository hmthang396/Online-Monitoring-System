const mongoose = require("mongoose");
const reportSchema = mongoose.Schema({
    project:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"Project",
    },
    nodes:[{
        type : mongoose.Schema.Types.ObjectId,
        ref:"Node",
    }],
    file:{
        type:String,
        trim:true,
        unique: true
    },
    row:{
        type: Number ,
    },
    col:{
        type: Number ,
    },
},
{
    timestamps : true,
});
const Report = mongoose.model("Report",reportSchema);
module.exports = Report;