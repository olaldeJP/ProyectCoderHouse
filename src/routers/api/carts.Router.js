import { Router } from "express";
import {
  agregarProductosArregloCartsByCId,
  mostrarListaDeCarts,
  mostrarCartByCId,
  createNewCart,
  borrarProductoDelCarrito,
  actualizarCarrito,
  actualizarProductoEnElCarrito,
  eliminarTodosLosProductosDelCarrito,
} from "../../controllers/ControllersApi/carts.Constrollers.js";

export const cartsRouter = new Router();

//Carga de los controllers al router de carts

cartsRouter.post("/", createNewCart);
cartsRouter.post("/:cid/product/:pid", agregarProductosArregloCartsByCId);
cartsRouter.get("/:cid", mostrarCartByCId);
cartsRouter.get("/", mostrarListaDeCarts);
cartsRouter.put("/:cId", actualizarCarrito);
cartsRouter.put("/:cId/products/:pid", actualizarProductoEnElCarrito);
cartsRouter.delete("/:cId/products/:pid", borrarProductoDelCarrito);
cartsRouter.delete("/:cId", eliminarTodosLosProductosDelCarrito);
