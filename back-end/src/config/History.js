const Node = require('../models/Node.model');
const History = require('../models/History.model');
const getData = require('../services/services');
const moment = require('moment');
let lastPostMinute = 0;
let historyInterval = 300;
const getHistory = async () => {
    let timeNow = new Date();
    let minutes = timeNow.getMinutes();
    let seconds = timeNow.getSeconds();
    let checked = (((minutes * 60) + seconds) % historyInterval);
    if ((checked == 0) && (((minutes * 60) + seconds) != lastPostMinute)) {
        lastPostMinute = parseInt((minutes * 60) + seconds);
        let nodes = await Node.find()
            .populate('method')
            .populate('datasource')
            .populate('role');
        nodes.forEach(async (node) => {
            if (node.role.history) {
                let value = await getData.historyVariable(node);
				console.log(`Time: ${moment(timeNow).format(`DD-MM-YYYY HH:mm:ss`)}\tValue:${value}`);
                History.create({
                    value,
                    nodeId: node._id,
                    time: timeNow
                });
            }
        });
    }

};
module.exports = {
    getHistory: getHistory
}
