const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getAllProducts = (req, res, next) => {
  console.log("Middleware express");

  Product.findAll()
    .then(products => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products"
      });
    })
    .catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByPk(prodId) //sequelize v5 replaced findById with findByPk
    .then(product => {
      //console.log(product);
      res.render("shop/product-detail", {
        prod: product,
        pageTitle: product.title,
        path: "/products"
      });
    })
    .catch(err => console.log(err));

  //another approach (using query)

  // Product.findAll({ where: { id: prodId } })
  //   .then(products => {
  //     console.log(products);
  //     res.render("shop/product-detail", {
  //       prod: products[0],
  //       pageTitle: products[0].title,
  //       path: "/products"
  //     });
  //   })
  //   .catch(err => console.log(err));

  // Product.findById(prodId)
  // .then(([product]) => {
  //     console.log(product);
  //     res.render('shop/product-detail', {
  //         prod : product[0],
  //         pageTitle : product[0].title,
  //         path : '/products'
  //     });
  // })
  // .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  console.log("Middleware express");

  Product.findAll()
    .then(products => {
      //console.log(products);
      res.render("shop/index", {
        prods: products,
        pageTitle: "Online Shop",
        path: "/"
      });
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Your Orders",
    path: "/orders"
  });
};

exports.getShopCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for (let product of products) {
        const cartProduct = cart.products.find(prod => prod.id === product.id);
        if (cartProduct) {
          cartProducts.push({ productData: product, qty: cartProduct.qty });
        }
      }

      res.render("shop/cart", {
        products: cartProducts,
        pageTitle: "Your Cart",
        path: "/cart"
      });
    });
  });
};

exports.postShopCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price);
    res.redirect("/cart");
  });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect("/cart");
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout"
  });
};
