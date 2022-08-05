import mongoose from "mongoose";
import { MongoDAO } from "./mongoDAO";
import { CartDTO } from "../types";

export class CartDAO extends MongoDAO<CartDTO> {
  private static _instance: CartDAO | null = null;

  private constructor() {
    const schema = new mongoose.Schema({
      productos: { type: Array, require: true },
      owner: { type: String, require: true },
    });
    const modelo = mongoose.model("carritos", schema);
    super(modelo);
  }

  public static getInstance(): CartDAO {
    if (!this._instance) {
      this._instance = new CartDAO();
    }
    return this._instance;
  }
}
