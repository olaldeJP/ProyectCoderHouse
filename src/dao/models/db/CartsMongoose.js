import mongoose, { Schema, model } from "mongoose";
import { cartsMongoose } from "../../../services/index.js";
import { v4 as uuidv4 } from "uuid";
import mongoosePaginate from "mongoose-paginate-v2";

const CartSchema = new Schema(
  {
    _id: { type: String, default: uuidv4 },
    products: {
      type: [
        {
          _id: { type: String, ref: "products" },
          quantity: { type: Number, min: 1, default: 1 },
        },
      ],
      default: [],
    },
  },
  { collection: "carts" },
  {
    strict: "throw",
    versionKey: false,
  }
);
CartSchema.plugin(mongoosePaginate);
export const cartsManagerMongoose = model("carts", CartSchema);

class CartsDaoMonoose {
  async create(data) {
    const newCart = await cartsMongoose.create({});
    return newCart;
  }
  async readOne(query) {
    const cart = await cartsMongoose.findById(query).lean();
    return cart;
  }
  async readMany(query) {
    const array = await cartsMongoose.find().lean();
    return array;
  }
  async updateOne(query, data) {}
  async updateMany(query, data) {}
  async deleteOne(query) {}
  async deleteMany(query) {}
}

export const cartsDaoMongoose = new CartsDaoMonoose();
