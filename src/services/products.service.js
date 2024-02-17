import { productsDaoMongoose } from "../dao/models/db/ProductsMongoose.js";
import { productsMongoose } from "./index.js";

class ProductService {
  async buscarPorID(_id) {
    const product = await productsDaoMongoose.readOne(_id);
    return product;
  }
  async mostrarVariosProductos() {
    const array = await productsDaoMongoose.readMany();
    return array;
  }

  async mostrarProductosPaginados(req) {
    try {
      const opcionesDePaginacion = {
        // Objeto con las opciones de paginacion enviados por query
        limit: req.query.limit || 10, //muestra un limite de productos paginados, si no se envia se pone en 10
        page: req.query.page || 1, //cantidad de paginas , se pone en 1 si no se envian paginas
        lean: true, // se muestran los objetos
      };

      if (req.query.sort) {
        //en el caso que se envie un query.sort se ordenaran los productos
        opcionesDePaginacion.sort = {
          price: req.query.sort === "desc" ? -1 : 1,
        };
      }
      let criterioBusqueda = {};
      if (req.query.title) {
        criterioBusqueda = {
          title: req.query.title || "",
        };
      }
      const productos = await productsMongoose.paginate(
        //se agrega la paginacion con un criterio de busqueda  y opciones de paginacion
        criterioBusqueda,
        opcionesDePaginacion
      );

      return {
        status: "success",
        payload: productos.docs, // productos enviados como arreglo
        totalPages: productos.totalPages, //total paginas
        prevPage: productos.prevPage, // link a la pagina siguiente
        nextPage: productos.nextPage, // link a la pagina anterior
        page: productos.page, //pagina actual
        hasPrevPage: productos.hasPrevPage, //si existe pagina anterior
        hasNextPage: productos.hasNextPage, //si existe pagina siguiente
        hayDocs: productos.docs > 0, //si docs es mayor a 0 los envia
        prevLink: productos.prevLink,
        user: req.user, //envia el usser conectado con fist_name , last_name , y isAdmin
      };
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
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
