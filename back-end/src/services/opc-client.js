const opcua = require("node-opcua");

const checkSecurity = async (node) => {
    const connectionStrategy = {
        maxRetry: 10000000,
        initialDelay: 100,
        maxDelay: 1000
    };
    let securityMode = opcua.MessageSecurityMode.None;
    let securityPolicy = opcua.SecurityPolicy.None;
    switch (node.datasource.securityMode) {
        case "None":
            securityMode = opcua.MessageSecurityMode.None;
            break;
        case "Invalid":
            securityMode = opcua.MessageSecurityMode.Invalid;
            break;
        case "Sign":
            securityMode = opcua.MessageSecurityMode.Sign;
            break;
        case "SignAndEncrypt":
            securityMode = opcua.MessageSecurityMode.SignAndEncrypt;
            break;
    }

    switch (node.datasource.securityPolicy) {
        case "None":
            securityPolicy = opcua.SecurityPolicy.None;
            break;
        case "Aes128_Sha256_RsaOaep":
            securityPolicy = opcua.SecurityPolicy.Aes128_Sha256_RsaOaep;
            break;
        case "Aes256_Sha256_RsaPss":
            securityPolicy = opcua.SecurityPolicy.Aes256_Sha256_RsaPss;
            break;
        case "Basic128":
            securityPolicy = opcua.SecurityPolicy.Basic128;
            break;
        case "Basic128Rsa15":
            securityPolicy = opcua.SecurityPolicy.Basic128Rsa15;
            break;
        case "Basic192":
            securityPolicy = opcua.SecurityPolicy.Basic192;
            break;
        case "Basic192Rsa15":
            securityPolicy = opcua.SecurityPolicy.Basic192Rsa15;
            break;
        case "Basic256":
            securityPolicy = opcua.SecurityPolicy.Basic256;
            break;
        case "Basic256Rsa15":
            securityPolicy = opcua.SecurityPolicy.Basic256Rsa15;
            break;
        case "Basic256Sha256":
            securityPolicy = opcua.SecurityPolicy.Basic256Sha256;
            break;
        case "Invalid":
            securityPolicy = opcua.SecurityPolicy.Invalid;
            break;
        case "PubSub_Aes128_CTR":
            securityPolicy = opcua.SecurityPolicy.PubSub_Aes128_CTR;
            break;
        case "PubSub_Aes256_CTR":
            securityPolicy = opcua.SecurityPolicy.PubSub_Aes256_CTR;
            break;
    }
    return {
        applicationName: "MyClient",
        connectionStrategy: connectionStrategy,
        securityMode: securityMode,
        securityPolicy: securityPolicy,

    };
};

const writeOPCBoolean = async (session, node, value) => {
    try {
        let nodesTowrite = {
            nodeId: node.variable.toString(),
            attributeId: opcua.AttributeIds.Value,
            value: {
                value: {
                    dataType: opcua.DataType.Boolean,
                    value: value,
                },
            },
        };
        let data = await session.write(nodesTowrite);
        return data;
    } catch (err) {
        console.log(err);
        return "Error";
    }
};

const writeOPCFloat = async (session, node, value) => {
    try {
        let nodesTowrite = {
            nodeId: node.variable.toString(),
            attributeId: opcua.AttributeIds.Value,
            value: {
                value: {
                    dataType: opcua.DataType.Float,
                    value: parseFloat(value),
                },
            },
        };
        let data = await session.write(nodesTowrite);
        return data;
    } catch (err) {
        console.log(err);
        return "Error";
    }
};

const writeOPCInt = async (session, node, value) => {
    try {
        let nodesTowrite = {
            nodeId: node.variable.toString(),
            attributeId: opcua.AttributeIds.Value,
            value: {
                value: {
                    dataType: opcua.DataType.Int32,
                    value: parseInt(value),
                },
            },
        };
        let data = await session.write(nodesTowrite);
        return data;
    } catch (err) {
        console.log(err);
        return "Error";
    }
};
module.exports = {
    read: async (node, account) => {
        try {
            if (node.role.read && account.permission.read) {
                let result = await promiseTimeout(new Promise((resolve, reject) => {
                    if (node.role.read && account.permission.read) {
                        (async () => {
                            let client = opcua.OPCUAClient.create(checkSecurity(node));
                            await client.connect(node.datasource.host.toString());
                            let session = await client.createSession();
                            let value = await session.read({
                                nodeId: node.variable.toString(),
                                attributeId: opcua.AttributeIds.Value,
                            }, 0)
                            if (value.statusCode._name == 'Good') {
                                resolve(value.value.value);
                            }
                            reject("Error");
                        })();
                    }
                    else {
                        reject("Lock");
                    }
                }), 10000, connectErr);
                return result;
            } else {
                return "Lock";
            }
        } catch (err) {
            console.log(err);
            return "Error";
        }
    },

    readControl: async (node, account) => {
        try {
            if (node.role.write && account.permission.write) {
                let result = await promiseTimeout(new Promise((resolve, reject) => {
                    if (node.role.read && account.permission.read) {
                        (async () => {
                            let client = opcua.OPCUAClient.create(checkSecurity(node));
                            await client.connect(node.datasource.host.toString());
                            let session = await client.createSession();
                            let value = await session.read({
                                nodeId: node.variable.toString(),
                                attributeId: opcua.AttributeIds.Value,
                            }, 0)
                            if (value.statusCode._name == 'Good') {
                                resolve(value.value.value);
                            }
                            reject("Error");
                        })();
                    }
                    else {
                        reject("Lock");
                    }
                }), 10000, connectErr);
                return result;
            } else {
                return "Lock";
            }
        } catch (err) {
            console.log(err);
            return "Error";
        }
    },

    write: async (node, account, value) => {
        try {
            if (node.role.write && account.permission.write) {
                let client = opcua.OPCUAClient.create(checkSecurity(node));
                await client.connect(node.datasource.host.toString());
                let endpointUrl = (await client.getEndpoints())[0].endpointUrl;
                await client.disconnect();
                await client.connect(endpointUrl);
                let session = await client.createSession();
                let result = 0;
                if (node.type.toString() === "Real" || node.type.toString() === "Float") {
                    result = await writeOPCFloat(session, node, value);
                }
                if (node.type.toString() === "Boolean" || node.type.toString() === "Bool") {
                    result = await writeOPCBoolean(session, node, value);
                }
                if (node.type.toString() === "Int" || node.type.toString() === "Integer") {
                    result = await writeOPCInt(session, node, value);
                }
                if (result._name.toString() === "Good") {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } catch (err) {
            console.log(`try catch OPC write ${err}`);
            return false;
        }
    },

    history: async (node) => {
        try {
            let client = opcua.OPCUAClient.create(checkSecurity(node));
            await client.connect(node.datasource.host.toString());
            let session = await client.createSession();
            let value = await session.read({
                nodeId: node.variable.toString(),
                attributeId: opcua.AttributeIds.Value,
            }, 0)
            if (value.statusCode._name == 'Good') {
                return (value.value.value);
            }
            return 'Error';
        } catch (err) {
            console.log(err);
            return "Error";
        }
    }

}