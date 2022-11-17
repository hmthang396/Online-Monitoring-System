const express = require("express");
let router = express.Router();
const projectController = require("../controllers/Project.controller");
router.get("/",projectController.get);
router.get("/all",projectController.getAll);
router.post("/",projectController.post);
router.put("/",projectController.put);
router.delete("/",projectController.delete);
module.exports = router;