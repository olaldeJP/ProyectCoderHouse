import { Router } from "express";
import { upload } from "../../middlewares/multer.Middlewares.js";
import {
  getProductsController,
  getProductsByIdController,
  addNewProduct,
  updateProduct,
  deleteProductMongoose,
} from "../../controllers/ControllersApi/products.Controllers.js";
import { extraerUserCookie } from "../../middlewares/cookies.Middlewares.js";

export const productsRouter = new Router();

productsRouter.get("/", getProductsController);
productsRouter.get("/:pid", getProductsByIdController);
productsRouter.post("/addImg", upload.single("imagenProductos"));
productsRouter.post("/", extraerUserCookie, addNewProduct);
productsRouter.put("/:pid", updateProduct);
productsRouter.delete("/:pId", deleteProductMongoose);
