const express = require("express");
let router = express.Router();
const dataController = require("../controllers/Data.controller");
router.post("/Read",dataController.getReadAll);
router.post("/Write",dataController.getWrite);
router.post("/ReadVariableControl",dataController.getReadAllVariableControl);
module.exports = router;