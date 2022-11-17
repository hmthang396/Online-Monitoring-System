const express = require("express");
let router = express.Router();
const dataSourceController = require("../controllers/DataSource.controller");
router.get("/",dataSourceController.get);
router.get("/all",dataSourceController.getAll);
router.post("/",dataSourceController.post);
router.put("/",dataSourceController.put);
router.delete("/",dataSourceController.delete);
module.exports = router;