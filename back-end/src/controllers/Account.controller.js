const RoleAccount = require('../models/RoleAccount.model');
const Account = require('../models/Account.model');

module.exports = {
    getAll:async(req,res)=>{
        try{
            let account = await Account.find().select("-password").populate('project').populate('permission');
            return res.json({
                Data: account,
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
            const {accountId} = req.body;
            if (!accountId) {
                console.log("Invalid data passed into request");
                return res.sendStatus(400);
            }
            let account = await Account.findOne({
                _id:accountId
            }).select("-password").populate('project').populate('permission');
            return res.json({
                Data: account,
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
            const pic = req?.file?.filename;
            const {fullname,email,password,role,c,read,write,status,projectId} = req.body;
            let arrayProjects = new Array(projectId);
            if (!fullname || !email || !password || !role) {
                console.log("Invalid data passed into request");
                return res.sendStatus(400);
            }
            let roleAccount =await RoleAccount.create({
                read,
                write
            })
            let account = await Account.create({
                fullname,
                email,
                password,
                "refreshToken" : "",
                role,
                pic,
                project: projectId.length > 0 ? [...new Set(arrayProjects)] : [...new Set([])],
                permission:roleAccount._id,
                status
            });
            if(account){
                let data = await Account.findOne({
                    _id: account._id
                }).populate('project').populate('permission');
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
            const {fullname,email,role,pic,projectId,accountId,read,write} = req.body;
            if (!fullname || !email || !role ||!projectId || !accountId) {
                console.log("Invalid data passed into request");
                return res.sendStatus(400);
            }
            let accountUpdate = await Account.findByIdAndUpdate({
                _id:accountId
            },{
                fullname,
                email,
                role,
                pic,
                project:[...new Set(projectId)],
                status
            });
            await RoleAccount.updateOne({
                _id:accountUpdate.permission
            },{
                read,
                write
            })
            let account = await Account.findById({_id:accountId}).select("-password").populate('project').populate('permission');
            if(account){
                return res.json({
                    Data: account,
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
            const {accountId} = req.body;
            if (!accountId) {
                console.log("Invalid data passed into request");
                return res.sendStatus(400);
            }
            let account = await Account.findByIdAndDelete({_id:accountId});
            if(account){
                await RoleAccount.deleteOne({_id:account.permission});
                return res.json({
                    Data: account,
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