import { Router } from "express";
import { sesionActual } from "../../controllers/ControllersApi/users.Controllers.js";
import { soloLoguedosApi } from "../../controllers/ControllersApi/autorizaciones.Controllers.js";

export const userRouter = new Router();
userRouter.get("/current", soloLoguedosApi, sesionActual);
