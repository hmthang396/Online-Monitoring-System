const express = require("express");
let router = express.Router();
const reportController = require("../controllers/Report.controller");
router.get("/FileName", reportController.getNameFile);
router.post("/", reportController.create);
router.get("/", reportController.getAll);
router.get("/Download/:filename",reportController.downloadFile);
router.post("/DownloadReport",reportController.downloadREportFile);
module.exports = router;