const express = require("express");
let router = express.Router();
const dataController = require("../controllers/Data.controller");
router.get("/",dataController.getReadAll);
router.post("/",dataController.getWrite);
module.exports = router;