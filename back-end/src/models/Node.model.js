const mongoose = require("mongoose");
const { Schema } = mongoose;
const nodeSchema = mongoose.Schema({
    /**
     * Title display in dashboard
     */
    name:{
        type:String,
        trim:true,
        require:true,
    },
    /**
     * Description display in dashboard
     */
    description:{
        type:String,
        trim:true,
    },
    /*
     * is Boolen,Real,LReal,Double,Float,Int,...
    */
    type:{
        type:String,
        trim:true,
        require:true,
    },
    /**VARIABLE
     * is Address in Modbus mode
     * is Symnam in ADS
     * NodeID in OPC
     * Ethernet/IP is Program:MainProgram.SF01_FLowrate
     */
    variable:{
        type:String,
        trim:true,
        require:true,
    },
    /**
     * is Function Code in Modbus mode
     * is 0 in OPC or ADS mode
     */
    quantity:{
        type:mongoose.Schema.Types.Number,
        default:0
    },
    /**
     * is Function Code in Modbus mode
     * is null in OPC or ADS mode
     */
    code:{
        type:String,
        trim:true,
    },
    /**
     * unit : mg/L, ppm , m3/h, ....
     */
    unit:{
        type:String,
        trim:true,
    },
    tag:{
        type:String,
        trim:true,
    },
    project:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"Project",
    },
    method:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"Method",
    },
    datasource:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"DataSource",
    },
    role:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"RoleNode",
    },
},
{
    timestamps : true   
});

const Node = mongoose.model("Node",nodeSchema);
module.exports = Node;