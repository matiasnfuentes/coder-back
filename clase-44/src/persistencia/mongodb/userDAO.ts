import mongoose from "mongoose";
import { UserDTO } from "..//types";
import { MongoDAO } from "./mongoDAO";

export class UserDAO extends MongoDAO<UserDTO> {
  private static _instance: UserDAO | null = null;
  private constructor() {
    const schema = new mongoose.Schema({
      email: { type: String, require: true },
      password: { type: String, require: true },
      nyap: { type: String, require: true },
      direccion: { type: String, require: true },
      edad: { type: Number, require: true },
      avatar: { type: String, require: true },
      telefono: { type: String, require: true },
      isAdmin: { type: Boolean, require: false },
    });
    const modelo = mongoose.model("users", schema);
    super(modelo);
  }

  public static getInstance(): UserDAO {
    if (!this._instance) {
      this._instance = new UserDAO();
    }
    return this._instance;
  }
}
