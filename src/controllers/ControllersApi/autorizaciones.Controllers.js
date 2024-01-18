import { desencriptar } from "../../utils/criptorafia.js";
export async function soloLoguedosApi(req, res, next) {
  const signedCookie = req.signedCookies.authorization;
  if (signedCookie) {
    const tokenDesencript = await desencriptar(signedCookie);
    req.user = tokenDesencript;
  }
  next();
}
