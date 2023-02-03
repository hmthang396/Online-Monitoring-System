const opcua = require("node-opcua");
const ads = require("ads-client");
const adsapi = require('node-ads-api');
const { Controller, Tag, EthernetIP } = require('ethernet-ip');
/*
 * Function Promise Timeout
 */
const connectErr = new Error(
    "Error"
);
const promiseTimeout = (promise, ms, error = new Error("Error")) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => reject(error), ms);
        promise.then(resolve).catch(reject);
    });
};
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
const readADS = async (node, account) => {
    try {
        if (node.role.read && account.permission.read) {
            let client =await new ads.Client({
                routerAddress: node.datasource.host.toString(),
                routerTcpPort: 48898,
                targetAmsNetId: node.datasource.target.toString(),
                localAmsNetId: node.datasource.source.toString(),
                targetAdsPort: 851,
                localAdsPort: 32750,
                timeout: 2000,
            });
            client.on('read',()=>{
                console.log(`read`);
            })
            // client.connect().then((result) =>{
            //     console.log(result);
            //     client.readSymbol(node.variable).then((data)=>{
            //         console.log(data.value);
            //         client.disconnect(true).then((out)=>{
            //             return data.value.toFixed(2);
            //         })
            //     }).catch((error)=>{
            //         return "Error";
            //     })
            // }).catch((err)=>{
            //     return "Error";
            // })

            await client.connect();
            await client.removeAllListeners();
            let result = await client.readSymbol(`${node.variable}`);
            await client.disconnect(true);
            return result.value.toFixed(2);
        } else {
            return "Lock";
        }
    } catch (err) {
        await client.disconnect();
        console.log(err);
        return "Error";
    }
}
const readOPC = async (node, account) => {
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
};
const readEtherNetIP = async (node, account) => {
    try {
        // if(node.role.read && account.permission.read){
        //     let result = await promiseTimeout(new Promise((resolve,reject)=>{
        //         const PLC = new Controller();
        //         PLC.on('error',()=>{
        //             reject("error");
        //         });
        //         PLC.on('close',()=>{
        //             resolve("close");
        //         });
        //         PLC.on('lookup',()=>{
        //             resolve("lookup");
        //         });
        //         (async()=>{
        //             await PLC.connect(node.datasource.host.toString());
        //             let tag = new Tag(node.variable.toString());
        //             await PLC.readTag(tag);
        //             PLC.destroy();
        //             resolve(tag.value);
        //         })();
        //     }),3000,connectErr);
        //     return result;
        // }else{
        //     return "Lock";
        // }
        const PLC = new Controller();
        PLC.on('error', () => {
            return "error";
        });
        PLC.on('close', () => {
            return "close";
        });
        PLC.on('lookup', () => {
            return "lookup";
        });
        if (node.role.read && account.permission.read) {
            await PLC.connect(node.datasource.host.toString());
            let tag = new Tag(node.variable.toString());
            await PLC.readTag(tag);
            PLC.destroy();
            return tag.value;
        }
        else {
            return "Lock";
        }
    } catch (err) {
        console.log(`readEtherNetIP:\n ${err}`);
        return "Error";
    }
};
//

//
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
const writeOPC = async (node, value) => {
    try {
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
        return result;
    } catch (err) {
        console.log(err);
        return "Error";
    }
};
const writeADS = async (node, value) => {
    try {
        let client = new ads.Client({
            routerAddress: node.datasource.host.toString(),
            routerTcpPort: 48898,
            targetAmsNetId: node.datasource.target.toString(),
            localAmsNetId: node.datasource.source.toString(),
            targetAdsPort: parseInt(node.datasource.port),
            localAdsPort: 32750,
            timeout: 500,
        });
        await client.connect();
        let result = await client.writeSymbol(node.variable.toString(), value);
        await client.disconnect();
        return result;
    } catch (err) {
        await client.disconnect();
        console.log(err);
        return "Error";
    }
};
const writeEtherNetIP = async (node, value) => {
    try {
        const PLC = new Controller();
        PLC.on('error', () => {
            return "Error";
        });
        PLC.on('close', () => {
            return "close";
        });
        PLC.on('lookup', () => {
            return "lookup";
        });
        await PLC.connect(node.datasource.host.toString());
        let tag = new Tag(node.variable.toString());
        await PLC.readTag(tag);
        tag.value = value;
        let result = await PLC.writeTag(tag);
        PLC.destroy();
        return "Success";

    } catch (err) {
        PLC.destroy();
        return "Error";
    }
};
/**
 * Read variable nodeId
 * para : info of nodeId
 */
const readHistoryOPC = async (node) => {
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
};
const readHistoryADS = async (node) => {
    try {
        let client = new ads.Client({
            routerAddress: node.datasource.host.toString(),
            routerTcpPort: 48898,
            targetAmsNetId: node.datasource.target.toString(),
            localAmsNetId: node.datasource.source.toString(),
            targetAdsPort: 851,
            localAdsPort: 32750,
            timeout: 500,
        });
        await client.connect();
        let result = await client.readSymbol(`${node.variable}`);
        await client.disconnect();
        return result.value.toFixed(2);
    } catch (err) {
        console.log(err);
        return "Error";
    }
};
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
                                    return {
                                        ...node.toJSON(),
                                        value: await readOPC(node, para)
                                    };
                                }
                                if (node && node.method.method.toString() == "ADS") {
                                    try {
                                        let valueOfADS = await readADS(node, para);
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
                                        let result = await readEtherNetIP(node, para);
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
    writeVariable: async (para, value) => {
        try {
            if (para.role.write && para.method.method.toString() === "OPCUA") {
                let result = await writeOPC(para, value);
                if (result._name.toString() === "Good") {
                    return "Success";
                } else {
                    return "Failed";
                }
            }
            if (para.role.write && para.method.method.toString() === "ADS") {
                let result = await writeADS(para, value);
                if (result === "Error") {
                    return "Failed";
                } else {
                    return "Success";
                }
            }
            if (para.role.write && para.method.method.toString() === "Ethernet/IP") {
                let result = await writeEtherNetIP(para, value);
                return "Success";
            }
            return "Failed";
        } catch (err) {
            return "Error";
        }

    },
    historyVariable: async (node) => {
        try {
            if (node.method.method.toString() == "OPCUA") {
                return await readHistoryOPC(node);
            }

            if (node.method.method.toString() == "ADS") {
                return await readHistoryADS(node);
            }
            // if(node.method.method.toString() == "Ethernet/IP"){

            // }
            return "Error";
        } catch (err) {
            console.log(`try catch historyVariable ${err}`);
            return "Error";
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
                                    return {
                                        ...node.toJSON(),
                                        value: await readOPC(node, para)
                                    };
                                }
                                if (node && node.method.method.toString() == "ADS") {
                                    try {
                                        let valueOfADS = await readADS(node, para);
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
                                        let result = await readEtherNetIP(node, para);
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
    }
};