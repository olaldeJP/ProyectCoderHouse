import { encriptar } from "../utils/criptorafia.js";
import { COOKIE_OPTS } from "../config/config.js";
import { desencriptar } from "../utils/criptorafia.js";

export async function guardarUserToken(req, res, next) {
  const accessToken = await encriptar(req.user);
  res.cookie("authorization", accessToken, COOKIE_OPTS);
  next();
}

export async function extraerUserCookie(req, res, next) {
  try {
    const signedCookie = req.signedCookies.authorization;
    if (!signedCookie) {
      throw new Error("Not authorized");
    }
    const tokenDesencript = await desencriptar(signedCookie);
    req.user = tokenDesencript;
    next();
  } catch (error) {
    next(error);
  }
}
