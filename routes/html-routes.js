var path = require("path");
module.exports = function (app) {

    app.get("/", function (req, res) {

        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    app.get("/customer", function (req, res) {

        res.sendFile(path.join(__dirname, "../public/customer.html"));
    });

    app.get("/manager", function (req, res) {

        res.sendFile(path.join(__dirname, "../public/manager.html"));
    });

    app.get("/public/css/style", function (req, res) {

        res.sendFile(path.join(__dirname, "../public/css/style.css"));
    });

};