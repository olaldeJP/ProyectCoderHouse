import { desencriptar } from "../../utils/criptorafia.js";
export async function soloLoguedosApi(req, res, next) {
  const signedCookie = req.signedCookies.authorization;
  if (!signedCookie) {
    return res
      .status(403)
      .json({ status: "error", message: "Aun no iniciaste sesion" });
  }
  const tokenDesencript = await desencriptar(signedCookie);
  req.user = tokenDesencript;
  next();
}
export function soloLoguedosWeb(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  next();
}
