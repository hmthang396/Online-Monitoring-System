const express = require("express");
let router = express.Router();
const nodeController = require("../controllers/Node.controller");
router.get("/",nodeController.get);
router.post("/",nodeController.post);
router.put("/",nodeController.put);
router.delete("/",nodeController.delete);
module.exports = router;