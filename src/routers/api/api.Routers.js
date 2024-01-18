import { Router } from "express";
import { productsRouter } from "./products.Router.js";
import { cartsRouter } from "./carts.Router.js";
import { sessionsRouter } from "./sessions.Router.js";
import { chatRouter } from "./chat.Router.js";
import { userRouter } from "./users.Router.js";
export const apiRouter = new Router();

//Se agregan las apis de productos y Carts

apiRouter.use("/products", productsRouter);
apiRouter.use("/carts", cartsRouter);
apiRouter.use("/sessions", sessionsRouter);
apiRouter.use("/user", userRouter);
apiRouter.use("/messages", chatRouter);
