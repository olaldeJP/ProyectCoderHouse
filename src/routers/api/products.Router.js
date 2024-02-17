import { Router } from "express";
import { upload } from "../../middlewares/multer.Middlewares.js";
import {
  getProductsController,
  getProductsByIdController,
  addNewProduct,
  updateProduct,
  deleteProductMongoose,
  checkAdmin,
  getProductsPaginate,
} from "../../controllers/ControllersApi/products.Controllers.js";

export const productsRouter = new Router();

productsRouter.get("/", getProductsController);
productsRouter.get("/productsPaginate", getProductsPaginate);
productsRouter.get("/:pid", getProductsByIdController);
productsRouter.post("/addImg", upload.single("imagenProductos"));
productsRouter.post("/", addNewProduct);
productsRouter.put("/:pid", updateProduct);
productsRouter.delete("/:pId", deleteProductMongoose);
