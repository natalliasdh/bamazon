$(document).ready(function () {
    var prods;
    var newQ;
    var up;
    var total;
    var name_del;
    function allprod() {
        
        $.get("/api/products", function (data) {
            console.log(data);
            prods = data;
            if (data) {
                buildrows();
            };

        });

    };


    allprod();

    function buildrows() {
        var arprods = [];
        for (let i = 0; i < prods.length; i++) {
            arprods.push(design(prods[i]));

        }

    };

    function design(prod) {
       
        var newItem = $("<option>");
        newItem.text(prod.product_name);
        $("#choice").append(newItem);

    };

    $("#order").on("click", function (event) {
        event.preventDefault();
        
        $("#message").empty();
        var valid = true;
        function check() {

            if ($("#choice").val() == "" || $("#quant").val() == "" || $("#quant").val() == 0 || isNaN($("#quant").val())) { valid = false; }
            return valid;

        }

        check();

if (valid) {
        var itemName = $("#choice").val().trim();
        var itemQ = parseInt($("#quant").val().trim());
        console.log(itemName);
        console.log(itemQ);

        $.get("api/products/" + itemName, function (data) {

            console.log(data);
            newQ = parseInt(data.stock_quantity) - itemQ;
            total = parseInt(data.price) * itemQ;
            name_del=data.product_name;
            if (itemQ > parseInt(data.stock_quantity)) {
                $("#message").append("Insufficient Quantity!");

                return false;

            }
            up = {


                product_name: data.product_name,
                department_name: data.department_name,
                price: data.price,
                stock_quantity: newQ
            };

            $("#message").append("Your total price is: " + total+" dollar(s). Thank you for your order!");
        }).then(function () {

if(newQ>0) {
            $.ajax({
                method: "PUT",
                url: "/api/products",
                data: up
            }).then(function () {
                $("#choice").empty();
                allprod();
            });}

            else if(newQ==0) {

                $.ajax({
                    method: "DELETE",
                    url: "/api/products/" + name_del,
                  }).then(function () {
                    $("#choice").empty();
                    allprod();
                });

            }
        });
    } else {

        alert("Incorrect input data!");
    }


    });
});