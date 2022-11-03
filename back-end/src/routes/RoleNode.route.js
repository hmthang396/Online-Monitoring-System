const express = require("express");
let router = express.Router();
const roleNodeController = require("../controllers/RoleNode.controller");
router.get("/",roleNodeController.get);
router.post("/",roleNodeController.post);
router.put("/",roleNodeController.put);
router.delete("/",roleNodeController.delete);
module.exports = router;