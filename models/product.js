const path = require('path');
const fs = require('fs');

const Cart = require('./cart');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'data-file.json');

const getProductsFromFile = callback => {
    fs.readFile(p, (err, fileContent) => {
        if(err){
            console.log(err);
            callback([]);
        }
        else{
            callback(JSON.parse(fileContent));
        }
    });
};

module.exports = class Product {
    constructor(id, title, imageUrl, price, description) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    save() {
        //products.push(this);
        //console.log('save method executed', this);
        
        //save data into the file as json format
        // let products = [];
        //const p = path.join(path.dirname(process.mainModule.filename), 'data', 'data-file.json');
        // fs.readFile(p, (err, fileContent) => {
        //     if(!err){
        //         products = JSON.parse(fileContent);
        //     }
        // });
    
        getProductsFromFile(products => {
            if(this.id){
                const existingProductIndex = products.findIndex(product => product.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                    console.log('error is', err);
                });
            } 
            else {
                this.id = Math.random().toString();
                getProductsFromFile(products => {
                    products.push(this);
                    fs.writeFile(p, JSON.stringify(products), err => {
                        console.log('error is', err);
                    });
                });
            }
        });
    }

    static fetchAll(callback){
        // return products;
        // const p = path.join(path.dirname(process.mainModule.filename), 'data', 'data-file.json');

        getProductsFromFile(callback);
    }

    static findById(id, callback){
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            callback(product);
        });
    }

    static deleteById(id){
        getProductsFromFile(products => {
            const product = products.find(prod => prod.id === id);
            const updatedProducts = products.filter(prod => prod.id !== id);
            fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                if(!err){
                    Cart.deleteProduct(id, product.price);
                }
            });
        });
    }
};