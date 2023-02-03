const mqtt = require("./mqtt-client");
const ads = require("./ads-client");
const opcua = require("./opc-client");
const ethernetIP = require("./ethernetIP");

module.exports = {
    readVariable: async (para) => {
        try {
            if (para.project.length > 0) {
                return await Promise.all(para.project.map(async (project) => {
                    if (project.nodes.length > 0) {
                        return {
                            ...project,
                            nodes: await Promise.all(project.nodes.map(async (node) => {
                                if (node && node.method.method.toString() == "OPCUA") {
                                    try {
                                        return {
                                            ...node.toJSON(),
                                            value: await opcua.read(node, para)
                                        };
                                    } catch (error) {
                                        return {
                                            ...node.toJSON(),
                                            value: "Error"
                                        };
                                    }
                                }
                                if (node && node.method.method.toString() == "ADS") {
                                    try {
                                        let valueOfADS = await ads.read(node, para);
                                        return {
                                            ...node.toJSON(),
                                            value: valueOfADS
                                        };
                                    } catch (error) {
                                        return {
                                            ...node.toJSON(),
                                            value: "Error"
                                        };
                                    }
                                }
                                if (node && node.method.method.toString() == "Ethernet/IP") {
                                    try {
                                        let result = await ethernetIP.read(node, para);
                                        return {
                                            ...node.toJSON(),
                                            value: result
                                        };
                                    } catch (error) {
                                        return {
                                            ...node.toJSON(),
                                            value: "Error"
                                        };
                                    }
                                }
                                if (node && node.method.method.toString() == "MQTT") {
                                    try {
                                        return {
                                            ...node.toJSON(),
                                            value: await mqtt.read(node, para)
                                        };
                                    } catch (error) {
                                        return {
                                            ...node.toJSON(),
                                            value: "Error"
                                        };
                                    }
                                }
                                return node;
                            }))
                        };
                    }
                    return project;
                }));
            } else {
                return;
            }
        } catch (err) {
            console.log(`try catch readVariable ${err}`);
            return project;
        }
    },

    readVariableControl: async (para) => {
        try {
            if (para.project.length > 0) {
                return await Promise.all(para.project.map(async (project) => {
                    if (project.nodes.length > 0) {
                        return {
                            ...project,
                            nodes: await Promise.all(project.nodes.map(async (node) => {
                                if (node && node.method.method.toString() == "OPCUA") {
                                    try {
                                        return {
                                            ...node.toJSON(),
                                            value: await opcua.readControl(node, para)
                                        };
                                    } catch (error) {
                                        return {
                                            ...node.toJSON(),
                                            value: "Error"
                                        };
                                    }
                                }
                                if (node && node.method.method.toString() == "ADS") {
                                    try {
                                        let valueOfADS = await ads.readControl(node, para);
                                        return {
                                            ...node.toJSON(),
                                            value: valueOfADS
                                        };
                                    } catch (error) {
                                        return {
                                            ...node.toJSON(),
                                            value: "Error"
                                        };
                                    }
                                }
                                if (node && node.method.method.toString() == "Ethernet/IP") {
                                    try {
                                        let result = await ethernetIP.readControl(node, para);
                                        return {
                                            ...node.toJSON(),
                                            value: result
                                        };
                                    } catch (error) {
                                        return {
                                            ...node.toJSON(),
                                            value: "Error"
                                        };
                                    }
                                }
                                if (node && node.method.method.toString() == "MQTT") {
                                    try {
                                        return {
                                            ...node.toJSON(),
                                            value: await mqtt.readControl(node, para)
                                        };
                                    } catch (error) {
                                        return {
                                            ...node.toJSON(),
                                            value: "Error"
                                        };
                                    }
                                }
                                return node;
                            }))
                        };
                    }
                    return project;
                }));
            } else {
                return;
            }
        } catch (err) {
            console.log(`try catch readVariable ${err}`);
            return project;
        }
    },

    writeVariable: async (node, account, value) => {
        try {
            if (node.role.write && node.method.method.toString() === "MQTT") {
                let result = await mqtt.write(node, account, value);
                if (result) {
                    return "Success";
                } else {
                    return "Failed";
                }
            }
            if (node.role.write && node.method.method.toString() === "OPCUA") {
                let result = await opcua.write(node, account, value);
                if (result) {
                    return "Success";
                } else {
                    return "Failed";
                }
            }
            if (node.role.write && node.method.method.toString() === "ADS") {
                let result = await ads.write(node, account, value);
                if (result) {
                    return "Success";
                } else {
                    return "Failed";
                }
            }
            if (node.role.write && node.method.method.toString() === "Ethernet/IP") {
                let result = await ethernetIP.write(node, account, value);
                if (result) {
                    return "Success";
                } else {
                    return "Failed";
                }
            }
            return "Failed";
        } catch (err) {
            console.log(err);
            return "Error";
        }
    },

    historyVariable: async (node) => {
        try {
            if (node.method.method.toString() == "MQTT") {
                return await mqtt.history(node);
            }

            if (node.method.method.toString() == "OPCUA") {
                return await opcua.history(node);
            }

            if (node.method.method.toString() == "ADS") {
                return await ads.history(node);
            }
            // if(node.method.method.toString() == "Ethernet/IP"){

            // }
            return "Error";
        } catch (err) {
            console.log(`try catch historyVariable ${err}`);
            return "Error";
        }
    }
}