const Report = require('../models/Report.model');
const fs = require('fs');
const path = require("path");
const History = require('../models/History.model');
const ExportFile = require("../services/ExportFile");
module.exports = {
    getNameFile: async (req, res) => {
        try {
            let files = fs.readdirSync('./public/Report');
            return res.json({
                Data: files,
                ErrorCode: 0,
                Message: `Success`,
            });
        } catch (err) {
            return res.json({
                Data: [],
                ErrorCode: 99,
                Message: `Lỗi trong quá trình xử lý - ${err}`,
            });
        }
    },
    getAll: async (req, res) => {
        try {
            console.log(`getAll`);
            let report = await Report.find()
                .populate("project")
                .populate("nodes");
            return res.json({
                Data: report,
                ErrorCode: 0,
                Message: `Success`,
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
    create: async (req, res) => {
        try {

            const { project, nodes, file, row, col } = req.body;
            let arrayNodes = new Array();

            if (!project || !nodes || !file) {
                console.log("Invalid data passed into request");
                return res.sendStatus(400);
            }

            if (nodes) {
                nodes.forEach(element => {
                    arrayNodes.push(element.value)
                });
            }
            let report = await Report.create({
                nodes: arrayNodes,
                project: project,
                file: file,
                row,
                col
            });
            if (report) {
                return res.json({
                    Data: report,
                    ErrorCode: 0,
                    Message: `Success`,
                })
            }
            return res.json({
                Data: [],
                ErrorCode: 0,
                Message: `Success`,
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
    update: async (req, res) => {
        try {

        } catch (err) {
            return res.json({
                Data: [],
                ErrorCode: 99,
                Message: `Lỗi trong quá trình xử lý - ${err}`,
            });
        }
    },
    downloadFile: async (req, res) => {
        try {
            let { filename } = req.params;
            return res.download(path.join(__dirname, `../../public/Report/${filename}`));
        } catch (err) {
            return res.json({
                Data: [],
                ErrorCode: 99,
                Message: `Lỗi trong quá trình xử lý - ${err}`,
            });
        }
    },
    downloadREportFile: async (req, res) => {
        try {
            let { projectId, startDate, endDate } = req.body;
            let ReportConfig = await Report.findOne({
                project: projectId
            }).populate("nodes");
            let nodes = ReportConfig.nodes;
            let arrNodeRaw = await Promise.all(nodes.map(async (node) => {
                let history = await History.find({
                    nodeId: node._id,
                    time: {
                        $gt: startDate,
                        $lt: endDate,
                    }
                });
                return {
                    node,
                    history: history,
                    length: history.length,
                }
            }));
            let arrLengthNodes = arrNodeRaw.map((e) => { return e.length; });
            let nodeHasMaxLengthInHistory = arrNodeRaw.splice(arrLengthNodes.indexOf(Math.max(...arrLengthNodes)), 1)[0];

            let dataExport = nodeHasMaxLengthInHistory.history.map((node) => {
                let valueArr = {};
                valueArr["time"] = node.time;
                valueArr[nodeHasMaxLengthInHistory.node.name] = node.value;
                // //
                // let a = arrNodeRaw.map((element) => {
                //     let b = element.history.filter((h) =>
                //         new Date(h.time).getTime() === new Date(node.time).getTime()
                //     );
                //     let dataRaw = {};
                //     dataRaw[element.node.name] = b.length > 0 ? b[0].value : "NULL"
                //     return { ...dataRaw };
                // });
                // a.forEach((element) => {
                //     midData = { ...midData, ...element };
                // })
                // //
                arrNodeRaw.forEach((element) => {
                    let valueOfNode = element.history.filter((h) =>
                        new Date(h.time).getTime() === new Date(node.time).getTime()
                    );
                    valueArr[element.node.name] = valueOfNode.length > 0 ? valueOfNode[0].value : "NULL";
                })
                return { ...valueArr };
            });
            let result = await ExportFile.export(ReportConfig.file, ReportConfig.row, ReportConfig.col, startDate, endDate, dataExport);
            return res.download(result, (err) => {
                if (err) {
                    console.log(err);
                }
                fs.unlink(`${result}`, (error) => {
                    if (error) {
                        console.log(error);
                    }
                });
            });
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