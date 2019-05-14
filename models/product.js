const path = require('path');
const fs = require('fs');

//const products = [];

module.exports = class Product {
    constructor(t) {
        this.title = t;
    }

    save() {
        //products.push(this);
        //console.log('save method executed', this);
        
        //save data into the file as json format
        let products = [];
        const p = path.join(path.dirname(process.mainModule.filename), 'data', 'data-file.json');
        fs.readFile(p, (err, fileContent) => {
            if(!err){
                products = JSON.parse(fileContent);
            }
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err => {
                console.log('error is', err);
            });
        });
    }

    static fetchAll(callback){
        //return products;
        
        const p = path.join(path.dirname(process.mainModule.filename), 'data', 'data-file.json');
        fs.readFile(p, (err, fileContent) => {
            if(err){
                console.log(err);
                return callback([]);
            }
            callback(JSON.parse(fileContent));
        });
    }
};