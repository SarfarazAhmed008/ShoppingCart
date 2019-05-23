// const fs = require('fs');
// const path = require('path');
const db = require('../util/database');

// const p = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json');

module.exports = class Cart {
    // static addProduct(id, productPrice) =====> file system works
    static addProduct(id){
        let quantity;
        let totalPrice;
        db.execute('SELECT * FROM cart WHERE cart.product_id = ?', [id])
        .then(([cart]) => {
            console.log(cart);
            if(cart){
                quantity = cart.qty + 1;
                totalPrice = quantity * cart.total_price;
            } else {
                db.execute('SELECT * FROM products WHERE products.id = ?', [id])
                .then(([product]) => {
                    quantity = 1;
                    totalPrice = product.price;
                })
                .catch(err => console.log(err));
            }
        })
        .catch(err => console.log(err));

        return db.execute('INSERT INTO cart (product_id, qty, total_price) VALUES (?, ?, ?)',
            [id, quantity, totalPrice]);

        // Fetch the previous cart
        // fs.readFile(p, (err, fileContent) => {
        //     let cart = {products : [], totalPrice : 0};
        //     if(!err){
        //         cart = JSON.parse(fileContent);
        //     }
        //     // Analyze the cart -> Find existing product
        //     let existingProductIndex = cart.products.findIndex(prod => prod.id === id);
        //     let existingProduct = cart.products[existingProductIndex];
        //     let updatedProduct;
        //     // Add new product/ increase quantity
        //     if(existingProduct){
        //         updatedProduct = {...existingProduct};
        //         updatedProduct.qty = updatedProduct.qty + 1;
        //         cart.products = [...cart.products];
        //         cart.products[existingProductIndex] = updatedProduct;

        //     } else {
        //         updatedProduct = {id : id, qty : 1};
        //         cart.products = [...cart.products, updatedProduct];
        //     }
        //     cart.totalPrice = cart.totalPrice + +productPrice;
        //     fs.writeFile(p, JSON.stringify(cart), err => {
        //         console.log(err);
        //     });
        // });
    }

    static deleteProduct(id, productPrice){


        // fs.readFile(p, (err, fileContent) => {
        //     if(err){
        //         return;
        //     }
        //     const updatedCart = {...JSON.parse(fileContent)};
        //     const product = updatedCart.products.find(prod => prod.id === id);
        //     if(!product){
        //         return;
        //     }
        //     const productQty = product.qty;
        //     updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;
        //     const updatedProducts = updatedCart.products.filter(prod => prod.id !== id);
        //     updatedCart.products = updatedProducts;
        //     fs.writeFile(p, JSON.stringify(updatedCart), err => {
        //         console.log(err);
        //     });
        // });
    }

    static getCart(){


        // fs.readFile(p, (err, fileContent) => {
        //     const cart = JSON.parse(fileContent);
        //     if(err){
        //         callback(null);
        //     }
        //     else{
        //         callback(cart);
        //     }
        // });
    }

    // Simplified code => works fine too.......

    // static addProduct(id, productPrice){
    //    fs.readFile(p, (err, fileContent) => {
    //        let cart = {products : [], totalPrice : 0};
    //        if(!err){
    //            cart = JSON.parse(fileContent);
    //        }
    //        let existingProductIndex = cart.products.findIndex(prod => prod.id === id);
    //        let existingProduct = cart.products[existingProductIndex];
    //        let updatedProduct;
    //        if(existingProduct){
    //             existingProduct.qty = existingProduct.qty + 1;
    //             cart.products[existingProductIndex] = existingProduct;
    //        } else {
    //             updatedProduct = {id : id, qty : 1};
    //             cart.products.push(updatedProduct);
    //        }
    //        cart.totalPrice = cart.totalPrice + +productPrice;
    //        fs.writeFile(p, JSON.stringify(cart), err => {
    //            console.log(err);
    //        });
    //    });
    // }
};