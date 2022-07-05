import mongoose from "mongoose";
import { User } from "../modelo/types";
import { MongoDAO } from "./mongoDAO";

export class UserDao extends MongoDAO<User> {
  constructor() {
    const schema = new mongoose.Schema({
      email: { type: String, require: true },
      password: { type: String, require: true },
      nyap: { type: String, require: true },
      direccion: { type: String, require: true },
      edad: { type: Number, require: true },
      avatar: { type: String, require: true },
      telefono: { type: String, require: true },
      id: { type: String, require: false },
    });
    const modelo = mongoose.model("users", schema);
    super(modelo);
  }

  async getByEmail(email: string): Promise<User | void> {
    const element = await this.model.findOne({ email: email });
    return element;
  }
}
