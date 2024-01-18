import { Router } from "express";
import { upload } from "../../middlewares/multer.Middlewares.js";
import {
  getProductsController,
  getProductsByIdController,
  postAgregarProductMongoDBController,
  actualizarProductoIdMongoController,
  deleteProductMongoose,
} from "../../controllers/ControllersApi/products.Controllers.js";
export const productsRouter = new Router();

productsRouter.get("/", getProductsController);
productsRouter.get("/:pid", getProductsByIdController);
productsRouter.post("/addImg", upload.single("imagenProductos"));
productsRouter.post("/", postAgregarProductMongoDBController);
productsRouter.put("/:pid", actualizarProductoIdMongoController);
productsRouter.delete("/:pId", deleteProductMongoose);
