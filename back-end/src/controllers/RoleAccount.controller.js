const RoleAccount = require('../models/RoleAccount.model');
module.exports = {
    get:async(req,res)=>{
        try{
            const {roleId} = req.body;
            if (!roleId) {
                console.log("Invalid data passed into request");
                return res.sendStatus(400);
            }
            let roleAccount = await RoleAccount.findOne({
                _id:roleId
            });
            return res.json({
                Data: roleAccount,
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
    put:async(req,res)=>{
        try{
            const {roleId,read,write} = req.body;
            if (!roleId) {
                console.log("Invalid data passed into request");
                return res.sendStatus(400);
            }
            let roleAccount = await RoleAccount.findByIdAndUpdate({
                _id:roleId
            },{
                read,
                write
            })
            if(roleAccount){
                return res.json({
                    Data: roleAccount,
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
}