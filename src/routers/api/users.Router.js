import { Router } from "express";
import { sesionActual } from "../../controllers/ControllersApi/users.Controllers.js";
import { extraerUserCookie } from "../../controllers/ControllersApi/autorizaciones.Controllers.js";
import { register } from "../../controllers/ControllersApi/sessions.Constrollers.js";
import { guardarUserToken } from "../../middlewares/cookies.Middlewares.js";

export const userRouter = new Router();
userRouter.get("/current", extraerUserCookie, sesionActual);
userRouter.post("/", register, guardarUserToken, (req, res) => {
  res.status(201).json({ status: "success", user: req.user });
});
