const express = require('express');

const Router = express.Router();

const AdminController = require('../controllers/admin');

Router.get('/add-product', AdminController.GET_AddProduct);
Router.post('/add-product', AdminController.POST_AddProduct);
Router.get('/products', AdminController.GET_Products);
Router.post('/delete-product',AdminController.POST_DeleteProduct);

Router.get('/edit-product/:productId',AdminController.GET_EditProduct);
Router.post('/edit-product/:productId',AdminController.POST_EditProduct);

module.exports.Router = Router;


