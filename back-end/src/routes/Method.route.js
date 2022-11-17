const express = require("express");
let router = express.Router();
const methodController = require("../controllers/Method.controller");
router.get("/",methodController.get);
router.get("/all",methodController.getAll);
router.post("/",methodController.post);
router.put("/",methodController.put);
router.delete("/",methodController.delete);
module.exports = router;