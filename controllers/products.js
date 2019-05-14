const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    console.log('Middleware product');
    res.render('add-product', {
        pageTitle : 'Add Product', 
        path : '/admin/add-product',
        hasFormCSS : true,
        hasProdCSS : true,
        addprodActive : true,
    });
    //before adding controller codes (below)...
    //res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    //res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
    //res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
};

exports.postAddProduct = (req, res, next) => {
    console.log(req.body);
    console.log(req.body.title);
    const product = new Product(req.body.title);
    product.save();
    //products.push({title: req.body.title});
    res.redirect('/');
};

exports.getAllProducts = (req, res, next) => {
    console.log('Middleware express');
    //const products = Product.fetchAll();
    
    Product.fetchAll(products => {
        res.render('shop', {
            prods : products, 
            pageTitle : 'Shop Cart', 
            path : '/', 
            hasProduct : products.length > 0,
            hasProdCSS : true,
            shopActive : true
        });
    });
    
    //before adding controller codes (below)...
    //res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    //res.send('<p>hello from express</p>');
};