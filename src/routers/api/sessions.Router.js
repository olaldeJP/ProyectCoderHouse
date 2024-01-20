import { Router } from "express";
import passport from "passport";
import {
  register,
  logout,
  cambiarPass,
} from "../../controllers/ControllersApi/sessions.Constrollers.js";
import { guardarUserToken } from "../../middlewares/cookies.Middlewares.js";
export const sessionsRouter = new Router();

sessionsRouter.use((req, res, next) => {
  next();
});

sessionsRouter.post(
  "/loginPassport",
  passport.authenticate("loginLocal", {
    failWithError: true,
  }),
  guardarUserToken,
  async (req, res) => {
    res.status(201).json({ status: "success", user: req.user });
  },

  (error, req, res, next) => {
    res.status(401).json({ status: "error", message: error.message });
  }
);

sessionsRouter.delete("/logout", logout);
sessionsRouter.put("/cambiarPassword", cambiarPass);
