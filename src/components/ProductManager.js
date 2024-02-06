import { promises as fs } from "fs";

class ProductManager {
    constructor () {
        this.patch = "./productos.txt";
        this.products = [];
    }

    static id = 0;

    addProduct = async (title, description, price, img, code, stock) => {
        ProductManager.id++;
        let newProduct = {
            title, 
            description,
            price,
            img,
            code,
            stock,
            id: ProductManager.id
        }

        this.products.push(newProduct);
        
        await fs.writeFile(this.patch, JSON.stringify(this.products));
    }

    readProducts = async () => {
        let resultado = await fs.readFile(this.patch, "utf-8");
        return JSON.parse(resultado);
    } 

    getProducts = async () => {
         let resultadoAwait = await this.readProducts();
        return  console.log(resultadoAwait); 
    }

    getProductById = async (id) => {
        let resultadoId = await this.readProducts();
        if (!resultadoId.find(products => products.id === id)){
            console.log("Product not found!")
        } else {
            console.log(resultadoId.find((products) => products.id === id))
        }
    }

    deleteProductById = async (id) => {
        let resultadoId = await this.readProducts();
        let productFilter = resultadoId.filter(products => products.id != id)
        await fs.writeFile(this.patch, JSON.stringify(productFilter));
        console.log("Producto Eliminado")
    }

    updateProduct = async ({ id, ...producto }) => {
        await this.deleteProductById(id);
        let oldProduct = await this.readProducts();
        let modifiedProduct = [{...producto, id}, ...oldProduct];
        await fs.writeFile(this.patch, JSON.stringify(modifiedProduct));
    }
}

/* const productos = new ProductManager(); */

/* productos.addProduct("Campera", "Cuerina sintetica", 500, "no image", 100);
productos.addProduct("Buzo", "100% Algodon", 1000, "no image", 200);
productos.addProduct("Polera", "Poliester", 5000, "no image", 300);
productos.addProduct("Pantalon", "Jean negro", 4200, "no image", 400);
productos.addProduct("Joggin", "Mezcla nylon, rompevientos", 8500, "no image", 500);
productos.addProduct("Bolso", "C/monedero, cuerina sintetica", 1200, "no image", 600);
productos.addProduct("Lentes", "Lentes de sol espejados", 6300, "no image", 700);
productos.addProduct("Remera", "100% algodon, lisa blanca", 8400, "no image", 800);
productos.addProduct("Bermudas", "Bermudas cargo", 4900, "no image", 900);
productos.addProduct("Camisa", "Diseño palmeras", 1700, "no image", 1000); */

/* productos.getProducts(); */

/* productos.getProductById(1);
productos.getProductById(4); 

productos.deleteProductById(2);

productos.updateProduct({title: 'Polera', description: 'Poliester',price: 10000, img: 'no image', code: 300, id: 3}) */

export default ProductManager;