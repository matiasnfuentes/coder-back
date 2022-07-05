import mongoose from "mongoose";
import { Mensaje } from "../modelo/types";
import { MongoDAO } from "./mongoDAO";

export class MensajeDAO extends MongoDAO<Mensaje> {
  constructor() {
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
}
