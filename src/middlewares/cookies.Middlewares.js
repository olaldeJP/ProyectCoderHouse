import { encriptar } from "../utils/criptorafia.js";
import { COOKIE_OPTS } from "../config/config.js";
import { desencriptar } from "../utils/criptorafia.js";

export async function guardarUserToken(req, res, next) {
  const accessToken = await encriptar(req.user);
  res.cookie("authorization", accessToken, COOKIE_OPTS);
  next();
}

export async function extraerUserCookie(req, res, next) {
  const signedCookie = req.signedCookies.authorization;
  if (signedCookie) {
    const tokenDesencript = await desencriptar(signedCookie);
    req.user = tokenDesencript;
  }
  next();
}
