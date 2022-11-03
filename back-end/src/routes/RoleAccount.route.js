const express = require("express");
let router = express.Router();
const roleAccountController = require("../controllers/RoleAccount.controller");
router.get("/",roleAccountController.get);
router.put("/",roleAccountController.put);
module.exports = router;