const RoleAccount = require('../models/RoleAccount.model');
const Account = require('../models/Account.model');
const bcrypt = require('bcrypt');
module.exports = {
    login:async(req,res)=>{
        try{
            const {email,password} = req.body;
            if (!email || !password) {
                console.log("Invalid data passed into request");
                return res.json({
                    Data: null,
                    ErrorCode: 99,
                    Message: `Vui Lòng Điền đầy đủ thông tin`,
                });
            }
            let account = await Account.findOne({
                email:email
            }).populate('project').populate('permission');
            if(account && await bcrypt.compare(password, account.password)){
                let result =await Account.findOne({
                    _id:account._id
                }).select("-password").populate('project').populate('permission');
                req.user =result;
                return res.json({
                    Data: result,
                    ErrorCode: 0,
                    Message: "Thành công",
                    
                });
            };
            console.log(`Email hoặc Mật khẩu không đúng`);
            return res.json({
                Data: null,
                ErrorCode: 0,
                Message: `Email hoặc Mật khẩu không đúng`,
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