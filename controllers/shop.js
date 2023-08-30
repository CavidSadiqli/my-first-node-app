const Product = require('../models/product');
const Card = require('../models/card');

module.exports.GET_Products = (req,res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/products', {products : products, PageTitle : 'Shop'} );
    });
};
module.exports.GET_Details_Product = (req, res, next) => {
    const productId = req.params.productId;
    Product.fetchProductById(productId, (product) => {
        res.render('shop/product-details', {PageTitle : 'Details', product : product});
    });
};
module.exports.GET_Index = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/index', {products : products, PageTitle : 'Home'} );
    });
};
module.exports.GET_Card = (req, res, next) => {
    Card.fetchCard((card) => {
        res.render('shop/card', {PageTitle : 'Card', Card : card} );
    });
};
module.exports.GET_Orders = (req, res, next) => {
    res.render('shop/orders' , {PageTitle : 'Orders'});
};
module.exports.POST_Add_to_card = (req,res,next) => {
    const productID = req.body.productId;
    Product.fetchProductById(productID, (product) => {
        Card.addProduct(product);
        res.redirect('/card');
    });
};

module.exports.POST_Delete_from_card = (req,res,next) => {
    const productID = req.body.productId;
    Card.DeleteProductById(productID);
    res.redirect('/card');
};


