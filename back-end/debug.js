const OPC = require('./src/config/OPC');
const Node = require('./src/models/Node.model');
const Account = require('./src/models/Account.model');
const Project = require('./src/models/Project.model');
const RoleAccount = require('./src/models/RoleAccount.model');
const Method = require('./src/models/Method.model');
const DataSource = require('./src/models/DataSource.models');
const RoleNode = require('./src/models/RoleNode.model');
const connectDB = require("./src/db/db");
(async() => {
    try {
        await connectDB();
        try{
            const accountId = "635f23430f7d2f0800b0a8bd";
            let account = await Account.findOne({
                _id:accountId,
            }).select("-password").populate('project').populate('permission');
            let nodes = await Node.find({
                project:account.project.map(element=>{return element._id})
            }).populate('project')
            .populate('method')
            .populate('datasource')
            .populate('role');
            let listNode = account.project.map(element=>{
                let getNodeByProjectId = nodes.filter(node=>{
                    if(node.project._id.toString() == element._id.toString()){
                        let dataRaw = JSON.parse(JSON.stringify(node));
                        delete dataRaw.project;
                        return dataRaw;
                    }
                    return;
                });
                return {
                    name:element.name,
                    code:element.code,
                    description:element.description,
                    projectId: element._id,
                    nodes : getNodeByProjectId
                };
            });
            let result = await OPC.readVariable({
                ...account.toJSON(),
                project : listNode
            });
            return console.log({
                Data: {
                    ...account.toJSON(),
                    project : result
                },
                ErrorCode: 0,
                Message: `Success`,
            });
        }catch(err){
            console.log(err);
            return console.log({
                Data: [],
                ErrorCode: 99,
                Message: `Lỗi trong quá trình xử lý - ${err}`,
            });;
        }
    } catch (error) {
        console.log(error);
    }
})();
