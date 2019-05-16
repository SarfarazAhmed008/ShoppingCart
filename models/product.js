const path = require('path');
const fs = require('fs');

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
    constructor(title, imageUrl, price, description) {
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

        this.id = Math.random().toString();
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err => {
                console.log('error is', err);
            });
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
};