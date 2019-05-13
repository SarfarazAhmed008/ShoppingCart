const products = [];

module.exports = class Product {
    constructor(t) {
        this.title = t;
    }

    save() {
        products.push(this);
        //console.log('save method executed', this);
    }

    static fetchAll(){
        return products;
    }
}