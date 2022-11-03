const Node = require('../models/Node.model');
const DataSource = require('../models/DataSource.models');
const RoleNode = require('../models/RoleNode.model');
module.exports = {
    get:async(req,res)=>{
        try{
            const {nodeId} = req.body;
            if (!nodeId) {
                console.log("Invalid data passed into request");
                return res.sendStatus(400);
            }
            let node = await Node.findOne({
                _id: nodeId
            }).populate('project')
            .populate('method')
            .populate('datasource')
            .populate('role');
            return res.json({
                Data: node,
                ErrorCode: 0,
                Message: `Success`,
            })
        }catch(err){
            return res.json({
                Data: [],
                ErrorCode: 99,
                Message: `Lỗi trong quá trình xử lý - ${err}`,
            });
        }
    },
    post:async(req,res)=>{
        try{
            const {name,description,type,variable,quantity,code,projectId,methodId,host,target,source,port,securityMode,securityPolicy,unitId,read,write,history} = req.body;
            let dataSource = await DataSource.create({
                method:methodId,host,target,source,port,securityMode,securityPolicy,unitId
            });
            let roleNode = await RoleNode.create({
                read,write,history
            });
            let node = await Node.create({
                name,description,type,variable,quantity,code,
                project : projectId,
                method : methodId,
                datasource : dataSource._id,
                role : roleNode._id
            });
            if(node){
                let data = await Node.findOne({
                    _id: node._id
                }).populate('project')
                .populate('method')
                .populate('datasource')
                .populate('role');
                return res.json({
                    Data: data,
                    ErrorCode: 0,
                    Message: `Success`,
                })
            }
            return res.json({
                Data: [],
                ErrorCode: 0,
                Message: `Success`,
            })
        }catch(err){
            console.log(err);
            return res.json({
                Data: [],
                ErrorCode: 99,
                Message: `Lỗi trong quá trình xử lý - ${err}`,
            });
        }
    },
    put:async(req,res)=>{
        try{
            const {nodeId,name,description,type,variable,quantity,code,projectId,methodId,host,target,source,port,securityMode,securityPolicy,unitId,read,write,history} = req.body;
            if (!nodeId) {
                console.log("Invalid data passed into request");
                return res.sendStatus(400);
            }
            let node = await Node.findOne({
                _id: nodeId
            }).populate('project')
            .populate('method')
            .populate('datasource')
            .populate('role');
            if(node){
                let dataSource = await DataSource.findByIdAndUpdate({
                    _id:node.datasource._id
                },{
                    method:methodId,host,target,source,port,securityMode,securityPolicy,unitId
                });
                let roleNode = await RoleNode.findByIdAndUpdate({
                    _id:node.role._id
                },{
                    read,write,history
                });
                let nodeUpdate = await Node.updateOne({
                    name,description,type,variable,quantity,code,
                    project : projectId,
                    method : methodId,
                });
                let data = await Node.findOne({
                    _id: nodeId
                }).populate('project')
                .populate('method')
                .populate('datasource')
                .populate('role');
                return res.json({
                    Data: data,
                    ErrorCode: 0,
                    Message: `Success`,
                })
            }
            return res.json({
                Data: [],
                ErrorCode: 0,
                Message: `Fail`,
            })
        }catch(err){
            return res.json({
                Data: [],
                ErrorCode: 99,
                Message: `Lỗi trong quá trình xử lý - ${err}`,
            });
        }
    },
    delete:async(req,res)=>{
        try{
            const {nodeId} = req.body;
            if (!nodeId) {
                console.log("Invalid data passed into request");
                return res.sendStatus(400);
            }
            let node = await Node.findOne({
                _id: nodeId
            }).populate('project')
            .populate('method')
            .populate('datasource')
            .populate('role');
            if(node){
                await Node.findByIdAndDelete({_id:node._id});
                await DataSource.deleteOne({_id:node.datasource._id});
                await RoleNode.deleteOne({_id:node.role._id});
                return res.json({
                    Data: node,
                    ErrorCode: 0,
                    Message: `Success`,
                })
            }
            return res.json({
                Data: [],
                ErrorCode: 0,
                Message: `Success`,
            })
        }catch(err){
            return res.json({
                Data: [],
                ErrorCode: 99,
                Message: `Lỗi trong quá trình xử lý - ${err}`,
            });
        }
    },
};