const mongoose = require("mongoose");
const { Schema } = mongoose;
const dataSourceSchema = mongoose.Schema({
    method:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"Method",
    },
    /* HOST
     *with ADS is ip of device
     *with OPCUA is endpoint
     *with Modbus is ip of device
     */
    host:{ 
        type:String,
        trim:true,
        require:true,
    },
    /*
     *with ADS is target NetID
     *can be null with OPC of Modbus
     */
    target:{
        type:String,
        trim:true,
    },
    /*
     *with ADS is source NetID
     *can be null with OPC of Modbus
     */
    source:{
        type:String,
        trim:true,
    },
    /*
     * with ADS is Target port //851
     * with OPCUA is 4840
     * with Modbus is 502
     */
    port:{
        type:String,
        trim:true,
        require:true,
    },
    /*
     * with OPCUA in Anonymous
     * can be null with ADS of Modbus
     */
    securityMode:{
        type:String,
        trim:true,
        default:'None',
    },
    /*
     * with OPCUA in Anonymous
     * can be null with ADS of Modbus
     */
    securityPolicy:{
        type:String,
        trim:true,
        default:'None',
    },
    /*
     * with Modbus in slave address
     * can be null with ADS and OPCUA
     */
    unitId: {
        type:mongoose.Schema.Types.Number,
        default:0,
    }
},
{
    timestamps : true   
});

const DataSource = mongoose.model("DataSource",dataSourceSchema);

module.exports = DataSource;