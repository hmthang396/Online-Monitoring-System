const Node = require('../models/Node.model');
const History = require('../models/History.model');
module.exports = {
    getReadAll:async(req,res)=>{
        try{
            const {nodeId} = req.body;
            let nodes = await Node.find({
                _id:nodeId
            }).populate('histories');
            return res.json({
                Data: nodes,
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
            const {nodeId,start,end} = req.params;
            let nodes = await History.find({
                nodeId:nodeId,
                time : {
                    $gte:start,
                    $lt:end
                }
            });
            return res.json({
                Data: nodes,
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
    }
};