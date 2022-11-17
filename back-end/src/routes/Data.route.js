const express = require("express");
let router = express.Router();
const dataController = require("../controllers/Data.controller");
router.post("/Read",dataController.getReadAll);
router.post("/Write",dataController.getWrite);
module.exports = router;