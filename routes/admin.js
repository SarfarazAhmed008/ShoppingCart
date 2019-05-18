const path = require('path');

const express = require('express');

//const rootDir = require('../util/path');
const adminController = require('../controllers/admin');

const router = express.Router(); 

// admin/add-product => POST
router.post('/add-product',  adminController.postAddProduct);

// admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.postDeleteProduct);

// admin/products => GET
router.get('/products', adminController.getProducts);

module.exports = router;