const path = require('path');

const express = require('express');

//const rootDir = require('../util/path');
const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getAllProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/orders', shopController.getOrders);

router.get('/cart', shopController.getShopCart);

router.post('/cart', shopController.postShopCart);

router.post('/cart-delete-product', shopController.cartDeleteProduct);

router.get('/checkout', shopController.getCheckout);

module.exports = router;