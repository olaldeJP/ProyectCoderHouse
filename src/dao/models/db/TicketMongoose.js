import mongoose, { Schema, model } from "mongoose";
import { randomUUID } from "node:crypto";

const TicketManager = new Schema(
  {
    _id: { type: String, default: randomUUID },
    code: { type: String, required: true, unique: true },
    purchase_datetime: { type: Date },
    amount: { type: Number },
    purchaser: { type: String },
  },
  {
    strict: "throw",
    versionKey: false,
  }
);

export const ticketModel = mongoose.model("tickets", TicketManager);

class TicketDaoMongoose {
  async create(data) {}
  async readOne(query) {}
  async readMany(query, data) {}
  async updateOne(query) {}
  async updateMany(query, data) {}
  async deleteOne(query) {
    throw new Error("NOT IMPLEMENTED");
  }
  async deleteMany(query) {
    throw new Error("NOT IMPLEMENTED");
  }
}

export const ticketDaoMongoose = new TicketDaoMongoose();
