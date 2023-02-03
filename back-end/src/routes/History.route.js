const express = require("express");
let router = express.Router();
const historyController = require("../controllers/History.controller");
router.get("/:nodeId/:start/:end",historyController.get);
module.exports = router;