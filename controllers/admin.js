const Card = require('../models/card');
const Product = require('../models/product');
const ConsoleController = require('./console');

module.exports.GET_AddProduct = (req,res, next) => {
    res.render('admin/add-product', {PageTitle : 'Add Product'});
};

module.exports.POST_AddProduct = (req, res, next) => {
    const product = new Product(req.body.title,req.body.description, req.body.image_link, parseFloat(req.body.price));
    product.save();
    res.redirect('/admin/add-product');
};
module.exports.GET_EditProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.fetchProductById(productId, (product) => {
        res.render('admin/edit-product', {PageTitle : 'Edit Product', product: product});
    });
};

module.exports.POST_EditProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.editProductById(productId, req.body.title, req.body.description, req.body.image_link, req.body.price);
    Card.EditProductById(productId, req.body.title, req.body.description, req.body.image_link, req.body.price);
    res.redirect('/admin/products');
};

module.exports.POST_DeleteProduct = (req,res,next) => {
    const productId = req.body.productId;
    Product.deleteProductById(productId);
    Card.DeleteProductById(productId);
    res.redirect('/admin/products');
};

module.exports.GET_Products = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/product-list', {PageTitle : 'Products', products : products});
    });
};