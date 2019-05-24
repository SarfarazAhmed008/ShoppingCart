const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json');

module.exports = class Cart {
    static addProduct(id, productPrice){
        // Fetch the previous cart
        fs.readFile(p, (err, fileContent) => {
            let cart = {products : [], totalPrice : 0};
            if(!err){
                cart = JSON.parse(fileContent);
            }
            // Analyze the cart -> Find existing product
            let existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            let existingProduct = cart.products[existingProductIndex];
            //console.log('existI', existingProductIndex, 'existP', existingProduct);
            let updatedProduct;
            // Add new product/ increase quantity
            if(existingProduct){
                updatedProduct = {...existingProduct};
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;

            } else {
                updatedProduct = {id : id, qty : 1};
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            });
        });
    }

    static deleteProduct(id, productPrice){
        fs.readFile(p, (err, fileContent) => {
            if(err){
                return;
            }
            const updatedCart = {...JSON.parse(fileContent)};
            const product = updatedCart.products.find(prod => prod.id === id);
            //console.log(product);
            if(!product){
                return;
            }
            const productQty = product.qty;
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;
            const updatedProducts = updatedCart.products.filter(prod => prod.id !== id);
            updatedCart.products = updatedProducts;
            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                console.log(err);
            });
        });
    }

    static getCart(callback){
        fs.readFile(p, (err, fileContent) => {
            //const cart = JSON.parse(fileContent);
            if(err){
                callback({products:[], totalPrice:0});
            }
            else{
                callback(JSON.parse(fileContent));
            }
        });
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