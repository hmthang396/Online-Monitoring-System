const Mqtt = require('../models/MQTT.model');
const AsyncMQTT = require("async-mqtt");
module.exports = {
    read: async (node, account) => {
        try {
            if (node.role.read && account.permission.read) {
                let mqtt = await Mqtt.findOne({
                    topic: node.variable.toString()
                });
                return mqtt.value;
            } else {
                return "Lock";
            }
        } catch (err) {
            console.log(`try catch getByTopic ${err}`);
            return "Error";
        }
    },

    readControl: async (node, account) => {
        try {
            if (node.role.write && account.permission.write) {
                let mqtt = await Mqtt.findOne({
                    topic: node.variable.toString()
                });
                return mqtt.value;
            } else {
                return "Lock";
            }
        } catch (err) {
            console.log(`try catch getByTopic ${err}`);
            return "Error";
        }
    },

    write : async (node, account, value) =>{
        try {
            if (node.role.write && account.permission.write) {
                let client = await AsyncMQTT.connect(`${node.datasource.host.toString()}`,{
                    Port: node.datasource.port.toString(),
                    username : node.datasource.securityMode.toString(),
                    password : node.datasource.securityPolicy.toString(),
                    clientId : account._id,
                });
                await client.publish(node.variable, value.toString());
                await client.end();
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.log(`try catch MQTT write ${err}`);
            return false;
        }
    },

    history: async (node)=>{
        try {
            if (node.role.history) {
                let mqtt = await Mqtt.findOne({
                    topic: node.variable.toString()
                });
                return mqtt.value;
            } else {
                return "Lock";
            }
        } catch (err) {
            console.log(`try catch getByTopic ${err}`);
            return "Error";
        }
    }
}