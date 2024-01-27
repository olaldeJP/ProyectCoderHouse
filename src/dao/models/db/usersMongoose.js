import mongoose, { Schema, model } from "mongoose";
import { randomUUID } from "node:crypto";
import { hasheadasSonIguales, hashear } from "../../../services/crypt.js";
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
    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  {
    strict: "throw",
    versionKey: false,
    static: {},
  }
);

export const usersModel = mongoose.model("users", UsersManager);

class UsersDaoMonoose {
  async create(data) {
    data.password = hashear(data.password);
    const newUser = await usersMongoose.create(data);
    return await this.devolverSinPassword(newUser);
  }
  async readOne(query) {
    const user = await usersMongoose.findOne({ email: query.email }).lean();
    if (hasheadasSonIguales(query.password, user.password)) {
      return await this.devolverSinPassword(user);
    }
  }
  async readMany(query) {
    return await usersMongoose.find(query).lean();
  }
  async updateOne(query) {
    const updateUser = await usersMongoose.updateOne(
      { email: query.email },
      { $set: { password: query.password } },
      { new: true }
    );
    return updateUser;
  }
  async updateMany(query, data) {
    throw new Error("NOT IMPLEMENTED");
  }
  async deleteOne(query) {
    throw new Error("NOT IMPLEMENTED");
  }
  async deleteMany(query) {
    throw new Error("NOT IMPLEMENTED");
  }
  async devolverSinPassword(query) {
    const datosUsuario = {
      email: query["email"],
      first_name: query["first_name"],
      last_name: query["last_name"],
      age: query["age"],
      carts: query["carts"],
      role: query["role"],
    };
    return datosUsuario;
  }
}

export const userDaoMongoose = new UsersDaoMonoose();
