const RoleNode = require('../models/RoleNode.model');
module.exports = {
    get:async(req,res)=>{
        try{
            const {roleId} = req.body;
            if (!roleId) {
                console.log("Invalid data passed into request");
                return res.sendStatus(400);
            }
            let roleNode = await RoleNode.findOne({
                _id:roleId
            });
            return res.json({
                Data: roleNode,
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
            const {read,write,history} = req.body;
            if (!read || !write || !history ){
                console.log("Invalid data passed into request");
                return res.sendStatus(400);
            }
            let roleNode = await RoleNode.create({
                read,write,history
            });
            
            if(roleNode){
                return res.json({
                    Data: roleNode,
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
            const {roleId,read,write,history} = req.body;
            if (!roleId || !read || !write || !history) {
                console.log("Invalid data passed into request");
                return res.sendStatus(400);
            }
            let roleNode = await RoleNode.findByIdAndUpdate({
                _id:roleId
            },{
                read,write,history
            })
            if(roleNode){
                return res.json({
                    Data: roleNode,
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
    delete:async(req,res)=>{
        try{
            const {roleId} = req.body;
            if (!roleId) {
                console.log("Invalid data passed into request");
                return res.sendStatus(400);
            }
            let roleNode = await RoleNode.findByIdAndDelete({
                _id:roleId
            });
            
            if(roleNode){
                return res.json({
                    Data: roleNode,
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
}