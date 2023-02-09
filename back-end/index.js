const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const session = require("express-session");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./src/db/db");
const testing = require('./src/config/History');
const authentication = require("./src/middleware/authentication");
// Configuration 
//===============================================================

setInterval(testing.getHistory,1000);
// Connect to Database
//======================================================================
(async () => {
    try {
        await connectDB();
    } catch (error) {
        console.error(error);
    }
})();

// cài đặt ứng dùng express
//======================================================================
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    session({
        secret: "secret",
    })
);
const publicDirectoryPath = path.join(__dirname, "./public");
app.use(express.static(publicDirectoryPath));
//Config Route
//======================================================================
app.use("/Project",authentication, require('./src/routes/Project.route'));
app.use("/Account", require('./src/routes/Account.route'));
app.use("/RoleAccount",authentication, require('./src/routes/RoleAccount.route'));
app.use("/RoleNode",authentication, require('./src/routes/RoleNode.route'));
app.use("/Method",authentication, require('./src/routes/Method.route'));
app.use("/Node",authentication, require('./src/routes/Node.route'));
app.use("/Data",authentication, require('./src/routes/Data.route'));
app.use("/DataSource",authentication, require('./src/routes/DataSource.route'));
app.use("/History",authentication, require('./src/routes/History.route'));
app.use("/Report", require('./src/routes/Report.route'));
//Config PORT
//======================================================================
app.listen(process.env.PORT, function (err) {
    if (!err) console.log(`Server is up on port ${process.env.PORT}.`);
    else console.log(err);
});