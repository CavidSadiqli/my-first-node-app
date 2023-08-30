const express = require('express');

const ShopController = require("../controllers/shop");

const Router = express.Router();

Router.get('/', ShopController.GET_Index);
Router.get('/shop', ShopController.GET_Products);
Router.get('/card', ShopController.GET_Card);
Router.get('/orders', ShopController.GET_Orders);

Router.post('/add-to-card', ShopController.POST_Add_to_card);
Router.post('/card/delete-product', ShopController.POST_Delete_from_card);

Router.get('/products/details/:productId', ShopController.GET_Details_Product);

module.exports.Router = Router;
