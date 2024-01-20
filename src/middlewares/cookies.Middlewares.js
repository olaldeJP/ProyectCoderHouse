import { encriptar } from "../utils/criptorafia.js";
import { COOKIE_OPTS } from "../config/config.js";
export async function cookieCreate(req, res, next) {
  res.cookie("cookie", "Esta Cookie es re power", {
    maxAge: 1000 * 60 * 60 * 24,
  });
  next();
}
export async function guardarUserToken(req, res, next) {
  const accessToken = await encriptar(req.user);
  res.cookie("authorization", accessToken, COOKIE_OPTS);
  next();
}
