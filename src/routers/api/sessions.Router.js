import { Router } from "express";
import passport from "passport";
import {
  register,
  logout,
  cambiarPass,
} from "../../controllers/ControllersApi/sessions.Constrollers.js";
import { encriptar } from "../../utils/criptorafia.js";
import { COOKIE_OPTS } from "../../conf/config.js";
export const sessionsRouter = new Router();

sessionsRouter.use((req, res, next) => {
  next();
});
sessionsRouter.post("/register", register);
sessionsRouter.post(
  "/loginPassport",
  passport.authenticate("loginLocal", {
    failWithError: true,
  }),
  async (req, res, next) => {
    const accessToken = await encriptar(req.user);
    res.cookie("authorization", accessToken, COOKIE_OPTS);
    res.status(201).json({ status: "success", payload: req.user });
  },
  (error, req, res, next) => {
    res.status(401).json({ status: "error", message: error.message });
  }
);

sessionsRouter.delete("/logout", logout);
sessionsRouter.put("/cambiarPassword", cambiarPass);
