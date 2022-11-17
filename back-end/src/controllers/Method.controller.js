const Method = require('../models/Method.model');
module.exports = {
    getAll:async(req,res)=>{
        try{
            let method = await Method.find();
            return res.json({
                Data: method,
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
            const {methodId} = req.body;
            if (!methodId) {
                console.log("Invalid data passed into request");
                return res.sendStatus(400);
            }
            let method = await Method.findOne({
                _id:methodId
            });
            return res.json({
                Data: method,
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
            const {name,description,method} = req.body;
            if (!method || !name) {
                console.log("Invalid data passed into request");
                return res.sendStatus(400);
            }
            let newMethod = await Method.create({
                name,description,method
            });
            if(newMethod){
                return res.json({
                    Data: newMethod,
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
            const {name,description,method,methodId} = req.body;
            if (!method || !name || !methodId) {
                console.log("Invalid data passed into request");
                return res.sendStatus(400);
            }
            let updateMethod = await Method.findByIdAndUpdate({
                _id:methodId
            },{
                name,description,method
            })
            if(updateMethod){
                return res.json({
                    Data: updateMethod,
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
            const {methodId} = req.body;
            if (!methodId) {
                console.log("Invalid data passed into request");
                return res.sendStatus(400);
            }
            let method = await Method.findByIdAndDelete({
                _id:methodId
            });
            
            if(method){
                return res.json({
                    Data: method,
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