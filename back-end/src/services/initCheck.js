const Account = require('../models/Account.model');
const RoleAccount = require('../models/RoleAccount.model');
const Method = require('../models/Method.model');
const IsCreated = async () => {
    let accountAdmin = await Account.findOne({
        email: "hmthang396@gmail.com"
    });
    if(accountAdmin){
        console.log("Admin : hmthang396@gmail.com is created");
    }else{
        let roleAccount = await RoleAccount.create({
            read:true,
            write:true
        });
        let account = await Account.create({
            fullname : "Hoàng Minh Thắng",
            email : "hmthang396@gmail.com",
            password: "Nke@123456",
            refreshToken: "",
            role : "Admin",
            pic : "user.jpg",
            project: [...new Set([])],
            permission: roleAccount._id,
            status : false
        });
    }
};

const IsMethodCreated = async()=>{
    let methodMQTT = await Method.findOne({
        name: "MQTT",
    });
    if(methodMQTT){
        console.log("Method : MQTT is created");
    }else{
        let MQTT = await Method.create({
            name : "MQTT",
            description : "MQTT",
            method : "MQTT"
        });
    }

    let methodEthernetIP = await Method.findOne({
        name: "Ethernet/IP",
    });
    if(methodEthernetIP){
        console.log("Method : MQTT is created");
    }else{
        let EthernetIP = await Method.create({
            name : "Ethernet/IP",
            description : "Ethernet/IP",
            method : "Ethernet/IP"
        });
    }
}
module.exports = {
    IsCreated: IsCreated,
    IsMethodCreated:IsMethodCreated
}
