import mongoose from "mongoose";
import { MongoDAO } from "./mongoDAO";
import { CarritoDTO } from "../types";

export class CarritoDAO extends MongoDAO<CarritoDTO> {
  private static _instance: CarritoDAO | null = null;

  private constructor() {
    const schema = new mongoose.Schema({
      productos: { type: Array, require: true },
      owner: { type: String, require: true },
    });
    const modelo = mongoose.model("carritos", schema);
    super(modelo);
  }

  public static getInstance(): CarritoDAO {
    if (!this._instance) {
      this._instance = new CarritoDAO();
    }
    return this._instance;
  }
}
