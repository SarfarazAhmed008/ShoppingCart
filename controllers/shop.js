const Product = require('../models/product');

exports.getAllProducts = (req, res, next) => {
    console.log('Middleware express');
    //const products = Product.fetchAll();
    
    Product.fetchAll(products => {
        res.render('shop/product-list', {
            prods : products, 
            pageTitle : 'All Products', 
            path : '/products', 
            // hasProduct : products.length > 0,
            // hasProdCSS : true,
            // shopActive : true
        });
    });
    
    //before adding controller codes (below)...
    //res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    //res.send('<p>hello from express</p>');
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        res.render('shop/product-detail', {
            prod : product,
            pageTitle : product.title,
            path : '/products'
        });
    });

};


exports.getIndex = (req, res, next) => {
    console.log('Middleware express');
    //const products = Product.fetchAll();
    
    Product.fetchAll(products => {
        res.render('shop/index', {
            prods : products, 
            pageTitle : 'Online Shop', 
            path : '/', 
            // hasProduct : products.length > 0,
            // hasProdCSS : true,
            // shopActive : true
        });
    });
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle : 'Your Orders',
        path : '/orders'
    });
};

exports.getShopCart = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle : 'Your Cart',
        path: '/cart'
    });
};

exports.postShopCart = (req, res, next) => {
    const prodId = req.body.productId;
    console.log(prodId);
    res.redirect('/cart');
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle : 'Checkout',
        path : '/checkout'
    });
};