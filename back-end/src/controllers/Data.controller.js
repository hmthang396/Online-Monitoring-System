const { db } = require('../models/Account.model');
const Account = require('../models/Account.model');
const Project = require('../models/Project.model');
const Node = require('../models/Node.model');
const MQTT = require('../services/mqtt-client');
const services = require('../services/services');
module.exports = {
    getReadAll: async (req, res) => {
        try {
            const { accountId } = req.body;
            let account = await Account.findOne({
                _id: accountId,
            }).select("-password").populate('project').populate('permission');
            let nodes = await Node.find({
                project: account.project.map(element => { return element._id })
            }).populate('project')
                .populate('method')
                .populate('datasource')
                .populate('role');

            if (account.project.length > 0) {
                let listNode = account.project.map(element => {
                    let getNodeByProjectId = nodes.filter(node => {
                        if (node.project._id.toString() == element._id.toString() && node.role.read) {
                            let dataRaw = JSON.parse(JSON.stringify(node));
                            delete dataRaw.project;
                            return dataRaw;
                        }
                        return;
                    });
                    return {
                        name: element.name,
                        code: element.code,
                        description: element.description,
                        projectId: element._id,
                        nodes: getNodeByProjectId
                    };
                });
                let result = await services.readVariable({
                    ...account.toJSON(),
                    project: listNode
                });
                return res.json({
                    Data: {
                        ...account.toJSON(),
                        project: result
                    },
                    ErrorCode: 0,
                    Message: `Success`,
                })
            } else {
                return res.json({
                    Data: {
                        ...account.toJSON(),
                        project: []
                    },
                    ErrorCode: 0,
                    Message: `Success`,
                })
            }

        } catch (err) {
            return res.json({
                Data: [],
                ErrorCode: 99,
                Message: `Lỗi trong quá trình xử lý - ${err}`,
            });
        }
    },
    getWrite: async (req, res) => {
        try {
            const { accountId, nodeId, value } = req.body;
            let account = await Account.findOne({
                _id: accountId,
            }).select("-password").populate('project').populate('permission');
            if (account.permission.write) {
                let nodes = await Node.find({
                    project: account.project.map(element => { return element._id; })
                }).populate('project')
                    .populate('method')
                    .populate('datasource')
                    .populate('role');
                if (nodes) {
                    let node = nodes.filter(e => e._id.toString() === nodeId.toString());
                    if (node) {
                        let result = await services.writeVariable(node[0],account, value);
                        return res.json({
                            Data: result,
                            ErrorCode: 0,
                            Message: `Success`,
                        })
                    } else {
                        return res.json({
                            Data: [],
                            ErrorCode: 404,
                            Message: `Không tìm thấy biến ghi xuống - ${nodeId.toString()}`,
                        })
                    }
                } else {
                    return res.json({
                        Data: nodes,
                        ErrorCode: 404,
                        Message: `Không tìm thấy biến ghi xuống`,
                    })
                }
            } else {
                return res.json({
                    Data: [],
                    ErrorCode: 400,
                    Message: `Bạn không đủ quyền để điều khiển`,
                })
            }
        } catch (err) {
            console.log(err);
            return res.json({
                Data: [],
                ErrorCode: 99,
                Message: `Lỗi trong quá trình xử lý - ${err}`,
            });
        }
    },
    getReadAllVariableControl: async (req, res) => {
        try {
            const { accountId } = req.body;
            let account = await Account.findOne({
                _id: accountId,
            }).select("-password").populate('project').populate('permission');
            let nodes = await Node.find({
                project: account.project.map(element => { return element._id })
            }).populate('project')
                .populate('method')
                .populate('datasource')
                .populate('role');
            if (account.project.length > 0) {
                let listNode = account.project.map(element => {
                    let getNodeByProjectId = nodes.filter(node => {
                        if (node.project._id.toString() == element._id.toString() && node.role.write) {
                            let dataRaw = JSON.parse(JSON.stringify(node));
                            delete dataRaw.project;
                            return dataRaw;
                        }
                        return;
                    });
                    return {
                        name: element.name,
                        code: element.code,
                        description: element.description,
                        projectId: element._id,
                        nodes: getNodeByProjectId
                    };
                });
                let result = await services.readVariableControl({
                    ...account.toJSON(),
                    project: listNode
                });
                return res.json({
                    Data: {
                        ...account.toJSON(),
                        project: result
                    },
                    ErrorCode: 0,
                    Message: `Success`,
                })
            } else {
                return res.json({
                    Data: {
                        ...account.toJSON(),
                        project: []
                    },
                    ErrorCode: 0,
                    Message: `Success`,
                })
            }
        } catch (err) {
            return res.json({
                Data: [],
                ErrorCode: 99,
                Message: `Lỗi trong quá trình xử lý - ${err}`,
            });
        }
    },
    getReadTest: async (req, res) => {
        const { accountId } = req.body;
        let account = await Account.findOne({
            _id: accountId,
        }).select("-password").populate('project').populate('permission');
        let nodes = await Node.find({
            project: account.project.map(element => { return element._id })
        }).populate('project')
            .populate('method')
            .populate('datasource')
            .populate('role');
        let listNode = account.project.map(element => {
            let getNodeByProjectId = nodes.filter(node => {
                if (node.project._id.toString() == element._id.toString()) {
                    let dataRaw = JSON.parse(JSON.stringify(node));
                    delete dataRaw.project;
                    return dataRaw;
                }
                return;
            });
            return {
                name: element.name,
                code: element.code,
                description: element.description,
                projectId: element._id,
                nodes: getNodeByProjectId
            };
        });
        let result = await MQTT.read({
            ...account.toJSON(),
            project: listNode
        });
        return res.json({
            Data: {
                ...account.toJSON(),
                project: result
            },
            ErrorCode: 0,
            Message: `Success`,
        })
    }
};