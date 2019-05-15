const path = require('path');

const express = require('express');

//const rootDir = require('../util/path');
const adminController = require('../controllers/admin');

const router = express.Router(); 

// admin/add-product => POST
router.post('/add-product',  adminController.postAddProduct);

// admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// admin/products => GET
router.get('/products', adminController.getProducts);

module.exports = router;