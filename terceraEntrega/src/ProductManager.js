import { promises as fs } from 'fs'

export default class ProductManager{
    constructor(path){

    this.path=path
    this.products=[]
    }

    /*
    getProducts(){
        return this.products
    }
    */

    async getProducts () {
        try{
            const productos = JSON.parse(await fs.readFile(this.path, 'utf-8'))
            // console.log(productos)
            return productos
        } catch(error){
            console.error('Error: ',error)
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

    async getProductById(id){
        //En el productManager, la ruta esta en this.path
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const prod = products.find(producto => producto.id === id)
        if (prod) {
            console.log(prod)
        } else {
            console.log("Producto no existe")
        }
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

    async addProduct(product){
        //Consulto el txt y lo parseo
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))

        //Consulto si mi producto ya existe en el txt
        if (products.find(producto => producto.id == product.id)) {
            return "Producto ya agregado"
        }
        //Lo agrego al array al saber que no existe
        products.push(product)
        //Lo parseo y guardo el array modificado
        await fs.writeFile(this.path, JSON.stringify(products))
    }
    async updateProduct(id,nombre){
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const indice = products.findIndex(prod => prod.id === id)

        if (indice != -1) {
            //Mediante el indice modifico todos los atributos de mi objeto
            products[indice].title = nombre
            //Resto de los atributos presentes
            await fs.writeFile(this.path, JSON.stringify(products))
        } else {
            console.log("Producto no encontrado")
        }
    }

    async deleteProduct(id){
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const prods = products.filter(prod => prod.id != id)
        await fs.writeFile(this.path, JSON.stringify(prods))
    }
}

class Product {
    constructor(title,descripcion,price,thumbnail,code,stock){
        this.title=title
        this.descripcion=descripcion
        this.price=price
        this.thumbnail=thumbnail
        this.code=code
        this.stock=stock
        this.id = Product.incrementarId()
    }

    static incrementarId(){
        if(this.idIncrement){
            this.idIncrement++
        } else{
            this.idIncrement = 1
        }
        return this.idIncrement
    }
}
const producto1 = new Product('iphone', '11 pro max', 500,'', 'celular', 4)
const producto2 = new Product('motorola', 'g100', 200,'', 'celular', 8)

//console.log(producto1)
//console.log(producto2)

// const productManager = new ProductManager('./productos.txt')

//productManager.addProduct(producto1)
//productManager.addProduct(producto2)

// console.log(productManager.getProducts())
//console.log(productManager.getProductById(1))

//productManager.updateProduct(1,"Mundo")

//console.log(productManager.getProductById(2))

//productManager.deleteProduct(1)