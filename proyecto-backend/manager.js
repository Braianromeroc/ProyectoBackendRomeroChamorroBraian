class ProductManager {
    constructor() {
        this.products = []
    }
    getProducts() {
        return this.products
    }
    getProductById(idProduct) {
        let product = this.products.find(el => el.id == idProduct)

        if (product) {
            return product
        } else {
            return console.log('Not Found')
        }
    }

    addProduct(title, description, price, thumbnail, code, stock){
        let idProduct = (this.getProducts()).length

        let product = {
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,
            id: ++idProduct
        }

        let productCode = this.products.find(el => el.code == product.code)

        if (productCode) {
            return console.log('Code already exists')
        } else {
            this.products.push(product)
        }
        return this.products
    }
}

let productManager = new ProductManager();

let product = productManager.addProduct('iphone', '11 pro max', 500,'', 'celular', 4);

console.log(product);