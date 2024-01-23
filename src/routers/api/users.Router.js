import { Router } from "express";
import { register } from "../../controllers/ControllersApi/users.Controllers.js";
import { guardarUserToken } from "../../middlewares/cookies.Middlewares.js";

export const userRouter = new Router();
userRouter.post("/", register, guardarUserToken, (req, res) => {
  res.status(201).json({ status: "success", user: req.user });
});
