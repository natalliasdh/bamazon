
$(document).ready(function () {
    var prods;
    var newItem = $("<table class='table-striped'><tr><th>Product</th><th>Department</th><th>Price (USD)</th><th>Quantity</th>");
    function buildrows() {
        
       newItem = $("<table class='table-striped'><tr><th>Product</th><th>Department</th><th>Price (USD)</th><th>Quantity</th>");
        $("#results").append(newItem);
        var arprods = [];
        for (let i = 0; i < prods.length; i++) {
            arprods.push(design(prods[i]));
        }

      
    };

    function design(prod) {
        
        var newtr = $("<tr>");
        var newtd1 = $("<td>");
        var newtd2 = $("<td>");
        var newtd3 = $("<td>");
        var newtd4 = $("<td>");
        newtd1.text(prod.product_name);
        newtd2.text(prod.department_name);
        newtd3.text(prod.price);
        newtd4.text(prod.stock_quantity);
      newtr.append(newtd1,newtd2,newtd3, newtd4);
        // console.log(prod.product_name);
       
        newItem.append(newtr);

    };


    $("#opt").on("change", function (event) {
        event.preventDefault();
        
        $("#results").empty();
        var selid = $("#opt option:selected").attr("id");
        if (selid == "sel1") { f1(); }
        if (selid == "sel2") { f2(); }
        if (selid == "sel3") { f3(); }
        if (selid == "sel4") { f4(); }



        function f1() {
            
            $.get("/api/products", function (data) {
                
                console.log(data);
                prods = data;
                if (data) {
                    buildrows();
                };
            });
        }


        function f2() {
            $.get("/api/products", function (data) {
                newItem.empty();
                newItem = $("<table class='table-striped'><tr><th>Product</th><th>Department</th><th>Price (USD)</th><th>Quantity</th>");
                $("#results").append(newItem);
                var arprods2 = [];
                console.log(data);
                for (let i = 0; i < data.length; i++) {
                    console.log(data[i].product_name);
                    if (parseInt(data[i].stock_quantity) < 5) { arprods2.push(design(data[i])); }

                }
            });
        }


        function f3() {
            var label=$("<label for='name'>");
            label.text("Product name:");
            var name = $("<br><input type='text' id='name' class='inv'><br>");
            var label2=$("<label for='q'>");
            label2.text("Add the quantity:");
            var q = $("<br><input type='text' id='q' class='inv-p'><br>");
            var edit = $("<button type='submit' id='edit' class='inv'>");
            edit.text("SUBMIT");
            $("#results").append(label,name, label2, q, edit);



            $("#edit").on("click", function (event) {

                var valid = true;
                function check() {
        
                    if ($("#name").val() == "" || $("#q").val() == "" || $("#q").val() == 0 || isNaN($("#q").val())) { valid = false; }
                    return valid;
        
                }
        
                check();
                var namedit = $("#name").val().trim();
                var newq = parseInt($("#q").val().trim());
                
                if(valid) {
                $.get("api/products/" + namedit, function (data) {

                    console.log(data);
                    newQ = parseInt(data.stock_quantity) + newq;
                    up = {
                        product_name: data.product_name,
                        department_name: data.department_name,
                        price: data.price,
                        stock_quantity: newQ
                    };

                }).then(function () {

                    $.ajax({
                        method: "PUT",
                        url: "/api/products",
                        data: up
                    }).then(function () {
                        $("#results").append("<br><br><span>Thank you. The quantity was added!</span>")
                    });
                });} else {alert("Incorrect data input!");}
            });
        };



        function f4() {
            var label5=$("<label for='newname'>");
            label5.text("Product name:");
            var newname = $("<br><input type='text' id='newname' name='newname'><br>");
            var label6=$("<label for='newdep'>");
            label6.text("Department:");
            var newdep = $("<br><input type='text' id='newdep' name='newdep'><br>");
            var label7=$("<label for='newprice'>");
            label7.text("Price (USD):");
            var newprice = $("<br><input type='text' id='newprice' name='newprice'><br>");
            var label8=$("<label for='newquant'>");
            label8.text("Quantity:");
            var newquant = $("<br><input type='text' id='newquant' name='newquant'><br>");
            var add = $("<button type='submit' id='add'>");
            add.text("ADD PRODUCT");
            $("#results").append(label5, newname, label6, newdep, label7,newprice,label8, newquant, add);
            $("#add").on("click", function (event) {
                event.preventDefault();
                var newprod_name = $("#newname").val().trim();
                var newdep_name = $("#newdep").val().trim();
                var newpr = $("#newprice").val().trim();
                var newstock = $("#newquant").val().trim();


                var valid2 = true;
                function check2() {
        
                    if (newprod_name == "" || newdep_name == "" || newpr == "" 
                    || newstock == "" 
                    || newpr == 0 
                    || newstock == 0 
                    || isNaN(newpr) || isNaN(newstock)) { valid2 = false; }
                    return valid2;
        
                }
        
                check2();
                if(valid2) {
                var newprod = {
                    product_name: newprod_name,
                    department_name: newdep_name,
                    price: newpr,
                    stock_quantity: newstock
                };

                $.post("/api/products", newprod, function () {
                }).then(function(){
                    $("#results").append("<br><br><span>Thank you. The product was added!</span>");
                });
            } else {alert("Incorrect data input!");};

            });
        };





    });
});