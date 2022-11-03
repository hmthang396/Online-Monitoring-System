const express = require("express");
let router = express.Router();
const accountController = require("../controllers/Account.controller");
router.get("/",accountController.get);
router.post("/",accountController.post);
router.put("/",accountController.put);
router.delete("/",accountController.delete);
module.exports = router;