import { Router } from "express";
import { sesionActual } from "../../controllers/ControllersApi/users.Controllers.js";
import { extraerUserCookie } from "../../middlewares/cookies.Middlewares.js";
import { register } from "../../controllers/ControllersApi/users.Controllers.js";
import { guardarUserToken } from "../../middlewares/cookies.Middlewares.js";

export const userRouter = new Router();
userRouter.get("/current", extraerUserCookie, sesionActual);
userRouter.post("/", register, guardarUserToken, (req, res) => {
  res.status(201).json({ status: "success", user: req.user });
});
