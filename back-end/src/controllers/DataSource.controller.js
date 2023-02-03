const DataSource = require('../models/DataSource.models');
module.exports = {
    getAll:async(req,res)=>{
        try{
            let dataSource = await DataSource.find().populate('method');
            return res.json({
                Data: dataSource,
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
    get:async(req,res)=>{
        try{
            const {dataSourceId} = req.body;
            if (!dataSourceId) {
                console.log("Invalid data passed into request");
                return res.sendStatus(400);
            }
            let dataSource = await DataSource.findOne({
                _id:dataSourceId
            });
            return res.json({
                Data: dataSource,
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
            const {methodId,host,target,source,port,securityMode,securityPolicy,unitId} = req.body;
            if (!methodId || !host) {
                console.log("Invalid data passed into request");
                return res.sendStatus(400);
            }
            console.log(methodId);
            let dataSource = await DataSource.create({
                "method":methodId.id
                ,host,target,source,port,securityMode,securityPolicy,unitId
            });
            
            if(dataSource){
                return res.json({
                    Data: dataSource,
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
            const {methodId,host,target,source,port,securityMode,securityPolicy,unitId,dataSourceId} = req.body;
            if (!methodId || !host || !dataSourceId) {
                console.log("Invalid data passed into request");
                return res.sendStatus(400);
            }
            await DataSource.updateOne({
                _id:dataSourceId
            },{
                methodId,host,target,source,port,securityMode,securityPolicy,unitId
            });
            
            let dataSource = await DataSource.findById({_id:dataSourceId});
            if(dataSource){
                return res.json({
                    Data: dataSource,
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
    delete:async(req,res)=>{
        try{
            const {id} = req.body;
            if (!id) {
                console.log("Invalid data passed into request");
                return res.sendStatus(400);
            }
            let dataSource = await DataSource.deleteOne({_id:id});
            if(dataSource){
                return res.json({
                    Data: dataSource,
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