import mongoose from "mongoose";
import { MessageDTO } from "../types";
import { MongoDAO } from "./mongoDAO";

export class MessageDAO extends MongoDAO<MessageDTO> {
  private static _instance: MessageDAO | null = null;

  private constructor() {
    const schema = new mongoose.Schema(
      {
        author: {
          id: { type: String, require: true },
          nombre: { type: String, require: true },
          apellido: { type: String, require: true },
          edad: { type: String, require: true },
          alias: { type: String, require: true },
          avatar: { type: String, require: true },
        },
        text: { type: String, require: true },
        timestamp: { type: String, require: true },
      },
      { versionKey: false }
    );
    const modelo = mongoose.model("mensajes", schema);
    super(modelo);
  }

  public static getInstance(): MessageDAO {
    if (!this._instance) {
      this._instance = new MessageDAO();
    }
    return this._instance;
  }
}
