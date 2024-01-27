import { productsDaoMongoose } from "../dao/models/db/ProductsMongoose.js";
class ProductService {
  async buscarPorID(_id) {
    const product = await productsDaoMongoose.readOne(_id);
    return product;
  }
  async mostrarVariosProductos() {
    const array = await productsDaoMongoose.readMany();
    return array;
  }
  async crearProducto(newProduct) {
    const productoCreado = await productsDaoMongoose.create(newProduct);
    return productoCreado;
  }
  async actualizarProducto(id, product) {
    const productoUpdate = await productsDaoMongoose.updateOne(id, product);
    return productoUpdate;
  }
  async borrarProductoPorID(_id) {
    const productoBorrado = await productsDaoMongoose.deleteOne(_id);
    return productoBorrado;
  }
}

export const productService = new ProductService();
