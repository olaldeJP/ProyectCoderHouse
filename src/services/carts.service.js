import { cartsDaoMongoose } from "../dao/models/db/CartsMongoose.js";
class CartsService {
  async buscarPorID(_id) {
    const carts = await cartsDaoMongoose.readOne(_id);
    return carts;
  }
  async mostrarVarioscarts() {
    const array = await cartsDaoMongoose.readMany();
    return array;
  }
  async crearNuevocart(newcarts) {
    const cartsoCreado = await cartsDaoMongoose.create(newcarts);
    return cartsoCreado;
  }
  async actualizarcartso(id, carts) {
    const cartsoUpdate = await cartsDaoMongoose.updateOne(id, carts);
    return cartsoUpdate;
  }
  async borrarcartsoPorID(_id) {
    const cartsoBorrado = await cartsDaoMongoose.deleteOne(_id);
    return cartsoBorrado;
  }
}

export const cartsService = new CartsService();
