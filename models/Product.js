module.exports = function (sequelize, DataTypes) {
    
    var Product = sequelize.define('Product', {
        product_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        department_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        stock_quantity:
            { type: DataTypes.INTEGER}


    });
    return Product;

};