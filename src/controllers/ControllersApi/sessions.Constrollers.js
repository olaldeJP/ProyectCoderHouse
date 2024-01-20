import { usersMongoose } from "../../services/index.js";
import { hashear } from "../../services/crypt.js";
import { COOKIE_OPTS } from "../../config/config.js";
//Se guarda en la base de datos el usuario enviado desde register.handlebars
export async function register(req, res, next) {
  try {
    req.body.password = hashear(req.body.password);
    const reg = await usersMongoose.create(req.body);
    req.user = reg.toObject();
    next();
  } catch (error) {
    return res.status(400).json({ status: "error", message: error.message });
  }
}
export async function cambiarPass(req, res) {
  try {
    req.body.password = hashear(req.body.password);
    const actualizado = await usersMongoose.updateOne(
      { email: req.body.email },
      { $set: { password: req.body.password } },
      { new: true }
    );
    res.json({ status: "success", payload: actualizado });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
}
export async function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ status: "logout error", body: err });
    }
    res.clearCookie("authorization", COOKIE_OPTS);
    res.status(200).json({ status: "success", message: "logout OK" });
  });
}
