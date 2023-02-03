const Mqtt = require('../models/MQTT.model');
module.exports = {
    getByTopic:async(req,res)=>{
        try{
            const {topic} = req.body;
            let mqtt = await Mqtt.findOne({
                topic:topic
            });
            return res.json({
                Data: mqtt,
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