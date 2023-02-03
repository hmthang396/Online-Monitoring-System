const mongoose = require("mongoose");
const projectSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
    },
    code:{
        type:String,
        trim:true,
        unique:true
    },
    description:{
        type:String,
        trim:true,
    }
},
{
    timestamps : true,
});

const Project = mongoose.model("Project",projectSchema);
module.exports = Project;