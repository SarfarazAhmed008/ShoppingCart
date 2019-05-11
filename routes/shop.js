const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('Middleware express');
    console.log(adminData.products);
    const products = adminData.products;
    res.render('shop', {
        prods : products, 
        pageTitle : 'Shop Cart', 
        path : '/', 
        hasProduct : products.length > 0,
        hasProdCSS : true,
        shopActive : true
    });
    //res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    //res.send('<p>hello from express</p>');
});

module.exports = router;