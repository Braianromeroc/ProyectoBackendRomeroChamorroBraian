import { promises as fs } from 'fs'

export default class ProductManager {
    constructor(path) {

        this.path = path
        this.products = []
    }

    /*
    getProducts(){
        return this.products
    }
    */

    async getProducts() {
        try {
            const productos = JSON.parse(await fs.readFile(this.path, 'utf-8'))
            // console.log(productos)
            return productos
        } catch (error) {
            console.error('Error: ', error)
        }
    }

    /*
    getProductById(idProduct) {
        let product = this.products.find(el => el.id == idProduct)

        if (product) {
            return product
        } else {
            return console.log('Not Found')
        }
    }
    */

    async getProductById(pid) {
        //En el productManager, la ruta esta en this.path
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const prod = products.find(producto => producto.pid === pid)
        return prod
    }


    /*     addProduct(title, description, price, thumbnail, code, stock){
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
    */

    async addProduct(product) {
        //Consulto el txt y lo parseo
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))

        product.pid = this.generateId(products)
        product.status = true;
        //Lo agrego al array al saber que no existe
        products.push(product)
        //Lo parseo y guardo el array modificado
        await fs.writeFile(this.path, JSON.stringify(products))
        return true;
    }

    async updateProduct(pid, product) {
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const indice = products.findIndex(prod => prod.pid === pid)

        if (indice != -1) {
            //Mediante el indice modifico todos los atributos de mi objeto
            products[indice].title = product.title
            products[indice].description = product.description
            products[indice].price = product.price
            products[indice].thumbnail = product.thumbnail
            products[indice].code = product.code
            products[indice].stock = product.stock
            products[indice].category = product.category

            await fs.writeFile(this.path, JSON.stringify(products))

            return true; // Retorna true para indicar éxito en la actualización
        } else {
            return false; // Retorna false si el producto no se encontró
        }
    }

    async deleteProduct(pid) {
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const prods = products.filter(prod => prod.pid != pid)
        await fs.writeFile(this.path, JSON.stringify(prods))
        return prods.length < products.length; // Devuelve true si se eliminó un producto, false si no se encontró
    }

    generateId(products) {

        if (products.length === 0) {
            return 1;
        }
        const maxId = products.reduce((max, prod) => (prod.pid > max ? prod.pid : max), 0);
        return maxId + 1;
        }

}
