import mongoose, { Schema, model } from "mongoose";
import { randomUUID } from "node:crypto";
import { hasheadasSonIguales } from "../../../services/crypt.js";
import { usersMongoose } from "../../../services/index.js";

const UsersManager = new Schema(
  {
    _id: { type: String, default: randomUUID },
    email: { type: String, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String },
    age: { type: Number },
    password: { type: String, required: true, default: "(NO ES NECESARIO)" },
    carts: { type: [], ref: "carts._id" },
    rol: { type: String, default: "user" },
  },
  {
    strict: "throw",
    versionKey: false,
    static: {},
  }
);

export const usersModel = mongoose.model("users", UsersManager);

export async function loginMongoose(email, password) {
  let datosUsuario;

  if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
    datosUsuario = {
      email: "admin",
      first_name: "admin",
      last_name: "admin",
      rol: "admin",
    };
  } else {
    const usuario = await usersMongoose.findOne({ email }).lean();
    if (!usuario) {
      throw new Error("login failed");
    }
    if (!hasheadasSonIguales(password, usuario["password"])) {
      throw new Error("login failed");
    }
    datosUsuario = {
      email: usuario["email"],
      first_name: usuario["first_name"],
      last_name: usuario["last_name"],
      age: usuario["age"],
      carts: usuario["carts"],
      rol: usuario["rol"],
    };
  }
  return datosUsuario;
}
