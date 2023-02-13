const RoleAccount = require('../models/RoleAccount.model');
const Account = require('../models/Account.model');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
module.exports = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                console.log("Invalid data passed into request");
                return res.json({
                    Data: null,
                    ErrorCode: 99,
                    Message: `Vui Lòng Điền đầy đủ thông tin`,
                });
            }
            let account = await Account.findOne({
                email: email
            }).populate('project').populate('permission');
            if (account && await bcrypt.compare(password, account.password)) {
                let result = await Account.findOne({
                    _id: account._id
                }).select("-password").select("-refreshToken").populate('project').populate('permission');
                const accessToken = await jwt.sign(
                    { email: result.email.toString() },
                    "secret", { expiresIn: "60m", algorithm: "HS256" }
                );
                const refreshToken = await jwt.sign({ email: result.email.toString() },
                    "$2a$10$aLOx0tlQYKfsu9RgpPIEEubyB8G.hff.mNEsMaxrJTtbCc5VdnTGy", { expiresIn: "1 day", algorithm: "HS256" }
                );
                await Account.findByIdAndUpdate({
                    _id: result._id
                }, { refreshToken: refreshToken })
                let test = { accessToken: accessToken.toString(), ...result.toJSON() };
                return res.json({
                    Data: test,
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
        } catch (err) {
            console.log(err);
            return res.json({
                Data: [],
                ErrorCode: 99,
                Message: `Lỗi trong quá trình xử lý - ${err}`,
            });
        }
    },
};