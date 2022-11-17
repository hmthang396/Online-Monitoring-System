const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const session = require("express-session");
const dotenv = require("dotenv");
const connectDB = require("./src/db/db");
// Configuration 
//===============================================================

// Connect to Database
//======================================================================
(async() => {
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

//Config Route
//======================================================================
app.use("/Project",require('./src/routes/Project.route'));
app.use("/Account",require('./src/routes/Account.route'));
app.use("/RoleAccount",require('./src/routes/RoleAccount.route'));
app.use("/RoleNode",require('./src/routes/RoleNode.route'));
app.use("/Method",require('./src/routes/Method.route'));
app.use("/Node",require('./src/routes/Node.route'));
app.use("/Data",require('./src/routes/Data.route'));
app.use("/DataSource",require('./src/routes/DataSource.route'));
//Config PORT
//======================================================================
app.listen(process.env.PORT, function(err) {
    if (!err) console.log(`Server is up on port ${process.env.PORT}.`);
    else console.log(err);
});