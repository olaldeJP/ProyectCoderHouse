import { productsMongoose } from "../../services/index.js";
// import { changeNameAndId } from "../../middlewares/multer.Middlewares.js";
import { productService } from "../../services/products.service.js";

export async function getProductsController(req, res) {
  try {
    const array = await productService.mostrarVariosProductos();
    return res.status(200).json({ statuss: "sucess", products: array });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
}

// Devuelve el producto con el ID especifico, en caso de no existir deuelve False
export async function getProductsByIdController(req, res) {
  try {
    const product = await productService.buscarPorID(req.params.pid);
    if (!product) {
      throw new Error();
    }
    return res.status(200).json({ status: "success", products: product });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "error en mostrar el producto por ID ",
    });
  }
}
//Se envia la funcion agregada en res["sendProducts"]() del socket para actualizar los productos
export async function postAgregarProductController(req, res) {
  try {
    res["sendProducts"]();
    return res.status(201).json(res["productBody"]);
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
}

//!TODO ESTO NECESITA CAMBIARSE POR MONGOOSE
//Se elimina el producto de la base de datos y se envia los productos por el socket
// export async function eliminarProductoIdController(req, res) {
//   const id = req.params.pid;

//   try {
//     await managerProducts.deleteProductByID(id);
//     res["sendProducts"]();
//     return res
//       .status(201)
//       .json({ status: "success", messagge: `${id} ya no esta en la lista` });
//   } catch (error) {
//     return res.status(400).json({
//       status: "error",
//       message: "error Eliminando producto",
//     });
//   }
// }

//se crea un producto nuevo en la base de datos

export async function addNewProduct(req, res) {
  try {
    const nuevoProduct = await productService.crearProducto(req.body);
    return res.status(201).json(nuevoProduct);
  } catch (error) {
    return res.status(400).json({ status: "error", message: error.message });
  }
}

export async function updateProduct(req, res) {
  try {
    const _id = req.params.pid;
    const productUpdate = await productService.actualizarProducto(
      _id,
      req.body
    );
    if (!productUpdate) {
      throw new Error("Product Not Found");
    } else {
      return res.status(200).json(productUpdate);
    }
  } catch (error) {
    return res.status(400).json({ status: "error", message: error.message });
  }
}

export async function deleteProductMongoose(req, res) {
  try {
    const productoEliminado = await productService.borrarProductoPorID(
      req.params.pId
    );

    if (!productoEliminado) {
      return res.status(400).json({
        status: "error",
        message: "Id Invalido para eliminar el producto",
      });
    }
    return res.status(200).json(productoEliminado);
  } catch (error) {
    return res.status(400).json({ status: "error", message: error.message });
  }
}

export async function agregarImg(req, res) {}

export async function manejadorDeErrores(error, req, res, next) {
  res.status(400).json({ status: "error", message: error.message });
}
