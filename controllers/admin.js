const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    console.log('Middleware product');
    res.render('admin/add-product', {
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
    //console.log(req.body.title);
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(title, imageUrl, price, description);
    product.save();
    //products.push({title: req.body.title});
    res.redirect('/');
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
            prods : products, 
            pageTitle : 'Admin Products', 
            path : '/admin/products', 
        });
    });
};