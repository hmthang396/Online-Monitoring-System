const express = require("express");
let router = express.Router();
const multer = require("multer");
const accountController = require("../controllers/Account.controller");
const loginController = require("../controllers/Login.controller");
const authentication = require("../middleware/authentication");
let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/Image");
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + "." + file.originalname.split(".")[1]);
    },
});
let upload = multer({ storage: storage });

router.post("/login",loginController.login);
router.get("/all",authentication,accountController.getAll);
router.get("/",authentication,accountController.get);
router.post("/",upload.single("file"),accountController.post);
router.put("/",authentication,accountController.put);
router.put("/addProject",authentication,accountController.putProject);
router.delete("/",authentication,accountController.delete);
module.exports = router;