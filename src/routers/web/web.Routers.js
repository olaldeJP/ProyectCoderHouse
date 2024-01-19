import { Router } from "express";
import passport from "passport";
import {
  realTimeProductsWeb,
  chatHandlebars,
  mostrarProducto,
  mostrarLogin,
  verPerfil,
  mostrarProductosCarrito,
  ventanaRegister,
  restartPassword,
  homeWeb,
} from "../../controllers/ControllersWeb/web.Constrollers.js";
import { encriptar } from "../../utils/criptorafia.js";
import { COOKIE_OPTS } from "../../config/config.js";

export const webRouter = new Router();

webRouter.get("/", homeWeb);

//Renderiza la pagina de RealTimeHandlebars
webRouter.get("/realTimeProducts", realTimeProductsWeb);

//Renreriza la ventana de chatHandlebars
webRouter.get("/chatHandlebars", chatHandlebars);

//Muestra ventana de registro.handlebars
webRouter.get("/register", ventanaRegister);

//Logearse con GitHub
webRouter.get("/githublogin", passport.authenticate("loginGithub"));

webRouter.get(
  "/githubcallback",
  passport.authenticate("loginGithub", { failWithError: true }),
  async (req, res, next) => {
    const accessToken = await encriptar(req.user);
    res.cookie("authorization", accessToken, COOKIE_OPTS);
    res.redirect("/");
  }
);
//////Muestra ventana de Login.handlebars
webRouter.get("/login", mostrarLogin);

//////Muestra ventana de Login.handlebars
webRouter.get("/perfil", verPerfil);

webRouter.get("/restartpassword", restartPassword);

//Muestra los productos con paginate con Handlebars

//descripcion del producto
webRouter.get("/:pid", mostrarProducto);

// visualizar solo un carrito especifico
webRouter.get("/carts/:cid", mostrarProductosCarrito);
