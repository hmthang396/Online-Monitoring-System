
const Account = require('../models/Account.model');
const Project = require('../models/Project.model');
module.exports = {
    getAll: async (req, res) => {
        try {
            let project = await Project.find();
            return res.json({
                Data: project,
                ErrorCode: 0,
                Message: `Success`,
            })
        } catch (err) {
            return res.json({
                Data: [],
                ErrorCode: 99,
                Message: `Lỗi trong quá trình xử lý - ${err}`,
            });
        }
    },
    get: async (req, res) => {
        try {
            const { projectId } = req.body;
            if (!projectId) {
                console.log("Invalid data passed into request");
                return res.sendStatus(400);
            }
            let project = await Project.findOne({
                _id: projectId
            });
            return res.json({
                Data: project,
                ErrorCode: 0,
                Message: `Success`,
            })
        } catch (err) {
            return res.json({
                Data: [],
                ErrorCode: 99,
                Message: `Lỗi trong quá trình xử lý - ${err}`,
            });
        }
    },
    post: async (req, res) => {
        try {
            const { name, code, description } = req.body;
            if (!code || !name) {
                console.log("Invalid data passed into request");
                return res.sendStatus(400);
            }
            let project = await Project.create({
                name: name,
                code: code,
                description: description
            });

            if (project) {
                return res.json({
                    Data: project,
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
    put: async (req, res) => {
        try {
            const { name, code, description, projectId } = req.body;
            if (!code || !name || !projectId) {
                console.log("Invalid data passed into request");
                return res.sendStatus(400);
            }
            await Project.updateOne({
                _id: projectId
            }, {
                name,
                code,
                description
            });
            let project = await Project.findById({ _id: projectId });
            if (project) {
                return res.json({
                    Data: project,
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
            return res.json({
                Data: [],
                ErrorCode: 99,
                Message: `Lỗi trong quá trình xử lý - ${err}`,
            });
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.body;
            if (!id) {
                console.log("Invalid data passed into request");
                return res.sendStatus(400);
            }
            let project = await Project.deleteOne({ _id: id });
            console.log(project);
            if (project) {
                return res.json({
                    Data: project,
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
            return res.json({
                Data: [],
                ErrorCode: 99,
                Message: `Lỗi trong quá trình xử lý - ${err}`,
            });
        }
    },
    getProjectByAccountId: async (req, res) => {
        try {
            let {accountId} = req.body;
            let account = await Account.findById({ _id: accountId }).populate("project");
            let projects = account.project;
            return res.json({
                Data: projects,
                ErrorCode: 0,
                Message: `Success`,
            })
        } catch (err) {
            return res.json({
                Data: [],
                ErrorCode: 99,
                Message: `Lỗi trong quá trình xử lý - ${err}`,
            });
        }
    },
}