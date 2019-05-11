const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router(); 

const products = [];

// admin/add-product => POST
router.post('/add-product', (req, res, next) => {
    console.log(req.body);
    console.log(req.body.title);
    products.push({title: req.body.title});
    res.redirect('/');
});
// admin/add-product => GET
router.get('/add-product', (req, res, next) => {
    console.log('Middleware product');
    res.render('add-product', {
        pageTitle : 'Add Product', 
        path : '/admin/add-product',
        hasFormCSS : true,
        hasProdCSS : true,
        addprodActive : true,
    });
    //res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    //res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
    //res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
});

module.exports.routes = router;
module.exports.products = products;