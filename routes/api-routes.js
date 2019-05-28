var db = require("../models");


module.exports = function (app) {
    app.get("/api/products", function (req, res) {
        db.Product.findAll().then(function (result) {
            res.json(result);

        });
    });


    app.get("/api/products", function (req, res) {
        db.Product.findAll().then(function (result) {
            res.json(result);

        });
    });

    app.get("/api/products/:name", function (req, res) {
        db.Product.findOne(
            { where: { product_name: req.params.name } }
        ).then(function (result) {
            res.json(result);

        });

    });

    app.put("/api/products", function (req, res) {

        var up = {
            product_name: req.body.product_name,
            department_name: req.body.department_name,
            price: req.body.price,
            stock_quantity: req.body.stock_quantity
        };
        db.Product.update(up, {
            where: { product_name: req.body.product_name }
        }).then(function (result) {
            res.json(result);
        }).catch(function(err) {
            // Whenever a validation or flag fails, an error is thrown
            // We can "catch" the error to prevent it from being "thrown", which could crash our node app
              res.json(err);
            });
    });

    app.post("/api/products/", function (req, res) {
        db.Product.create({
            product_name: req.body.product_name,
            department_name: req.body.department_name,
            price: req.body.price,
            stock_quantity: req.body.stock_quantity
        }).then(function (result) {

            res.json(result);
        });
    });


    app.delete("/api/products/:name", function (req, res) {
        db.Product.destroy({
            where: {
              product_name: req.params.name
            }
          }).then(function(dbTodo) {
            res.json(dbTodo);
          });
    });


}