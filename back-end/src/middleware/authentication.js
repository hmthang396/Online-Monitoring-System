const Account = require('../models/Account.model');
const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
    const accessToken =
        req.header("Authorization") ||
        req.query.Authorization ||
        req.body.Authorization;
    if (accessToken) {
        try {
            const decoded = await jwt.verify(
                accessToken,
                "secret"
            );
            let user = await Account.findOne({
                email: decoded.email
            }).select("-password").populate('project').populate('permission');
            if (!user) {
                throw new Error();
                //res.status(401).send({ message: "Unauthorized accesss" });
            }
            next();
        } catch (e) {
            let decode = await jwt.decode(accessToken);
            if (e.message === "jwt expired") {
                console.log("jwt expired");
                let account = await Account.findOne({
                    email: decode.email
                }).select("-password").populate('project').populate('permission');
                // Check Refresh Token
                const decodeRefreshToken = await jwt.decode(account.refreshToken);
                if (parseInt(decodeRefreshToken.exp) < (parseInt(new Date().getTime() + 1) / 1000)) {
                    console.log("Dang Nhap lai");
                    res.status(400).send({ message: "Unauthorized accesss" });
                } else {
                    console.log("Sinh accesstoken moi");
                    const accessToken = await jwt.sign(
                        { email: decodeRefreshToken.email },
                        "secret", { expiresIn: "1m", algorithm: "HS256" }
                    );
                    account = account.toObject();
                    delete account.refreshToken;
                    let test = { accessToken: accessToken.toString(), ...JSON.parse(JSON.stringify(account)) };
                    res.status(200).json({
                        Data: test,
                        ErrorCode: 98,
                        Message: "Update Access Token",
                    })
                }

            } else {
                res.status(400).send({ message: "Unauthorized accesss" });
            }
        }
    } else {
        res.status(401).send({ message: "No token provided." });
    }
};

module.exports = authentication;