import { hashear } from "../../services/crypt.js";
import { usersMongoose } from "../../services/index.js";
export async function sesionActual(req, res) {
  try {
    if (req.user) {
      return res.status(200).json({ status: "success", user: req.user });
    }
    throw new Error("UNAUTHORIZED USER");
  } catch (error) {
    return res.status(404).json({ status: "error", message: error.message });
  }
}

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
