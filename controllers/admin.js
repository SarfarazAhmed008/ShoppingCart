const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  console.log("Middleware product");
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editable: false
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
  req.user
    .createProduct({
      title: title,
      imageUrl: imageUrl,
      price: price,
      description: description
    })
    .then(result => {
      res.redirect("/admin/products");
    })
    .catch(err => console.log(err));

  // Another approach to insert product that belongs to userId 1

  // Product.create({
  //   title: title,
  //   imageUrl: imageUrl,
  //   price: price,
  //   description: description,
  //   userId: req.user.id
  // })
  //   .then(result => {
  //     res.redirect("/admin/products");
  //   })
  //   .catch(err => console.log(err));

  // File system works
  //const product = new Product(null, title, imageUrl, price, description);
  // product
  // .save()
  // .then(() => {
  //     res.redirect('/');
  // })
  // .catch(err => console.log(err));
  // //products.push({title: req.body.title});
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  req.user
    .getProducts({ where: { id: prodId } })
    // Product.findByPk(prodId)
    .then(products => {
      const product = products[0];
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        product: product,
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editable: editMode
      });
    })
    .catch(err => console.log(err));

  // Product.findById(prodId, product => {
  //   if (!product) {
  //     return res.redirect("/");
  //   }
  //   res.render("admin/edit-product", {
  //     product: product,
  //     pageTitle: "Edit Product",
  //     path: "/admin/edit-product",
  //     editable: editMode
  //   });
  // });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  Product.findByPk(prodId)
    .then(product => {
      product.title = updatedTitle;
      product.imageUrl = updatedImageUrl;
      product.price = updatedPrice;
      product.description = updatedDescription;
      return product.save();
    })
    .then(result => {
      //console.log("After saving to db result:", result);
      res.redirect("/admin/products");
    })
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
    .then(product => {
      return product.destroy();
    })
    .then(result => {
      res.redirect("/admin/products");
    })
    .catch(err => console.log(err));

  // Another Approach to delete a product by ID
  // Product.destroy({ where: { id: prodId } })
  //   .then(result => {
  //     res.redirect("/admin/products");
  //   })
  //   .catch(err => console.log(err));

  // Product.deleteById(prodId)
  //   .then(() => {
  //     res.redirect("/admin/products");
  //   })
  //   .catch(err => console.log(err));
  // const prodId = req.body.productId;
  // Product.deleteById(prodId);
  // res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
  req.user
    .getProducts()
    .then(products => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products"
      });
    })
    .catch(err => console.log(err));

  // Product.fetchAll()
  //   .then(([rows, fieldData]) => {
  //     res.render("admin/products", {
  //       prods: rows,
  //       pageTitle: "Admin Products",
  //       path: "/admin/products"
  //     });
  //   })
  //   .catch(err => console.log(err));

  // Product.fetchAll(products => {
  //     res.render('admin/products', {
  //         prods : products,
  //         pageTitle : 'Admin Products',
  //         path : '/admin/products',
  //     });
  // });
};
