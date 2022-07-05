import mongoose from "mongoose";
import { MongoDAO } from "./mongoDAO";
import { CarritoDTO } from "./types";

export class CarritoDAO extends MongoDAO<CarritoDTO> {
  constructor() {
    const schema = new mongoose.Schema({
      productos: { type: Array, require: true },
      owner: { type: String, require: true },
    });
    const modelo = mongoose.model("carritos", schema);
    super(modelo);
  }
  async getByOwnerEmail(email: string): Promise<CarritoDTO> {
    const element = await this.model.findOne({ owner: email });
    return element;
  }

  async deleteByEmail(mail: string): Promise<void> {
    await this.model.deleteOne({ owner: mail });
  }
}
