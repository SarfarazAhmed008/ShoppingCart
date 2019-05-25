const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    console.log('Middleware product');
    res.render('admin/edit-product', {
        pageTitle : 'Add Product', 
        path : '/admin/add-product',
        editable : false
        // hasFormCSS : true,
        // hasProdCSS : true,
        // addprodActive : true,
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
    const product = new Product(null, title, imageUrl, price, description);
    product
    .save()
    .then(() => {
        res.redirect('/');
    })
    .catch(err => console.log(err));
    //products.push({title: req.body.title});
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode){
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        if(!product){
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            product : product,
            pageTitle : 'Edit Product',
            path : '/admin/edit-product',
            editable : editMode
        });
    });
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedPrice, updatedDescription);
    updatedProduct.save();
    res.redirect('/admin/products');
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId)
    .then(() => {
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err))
    // const prodId = req.body.productId;
    // Product.deleteById(prodId);
    // res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
    .then(([rows, fieldData]) => {
        res.render('admin/products', {
            prods : rows,
            pageTitle : 'Admin Products',
            path : '/admin/products'
        });
    })
    .catch(err => console.log(err));
    
    // Product.fetchAll(products => {
    //     res.render('admin/products', {
    //         prods : products, 
    //         pageTitle : 'Admin Products', 
    //         path : '/admin/products', 
    //     });
    // });
};