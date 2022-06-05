import mongoose from "mongoose";
import { MONGO_URL } from "../config";
import { Serializable } from "../modelo/types";
import { DAO } from "./types";

export const URLMONGO: string = MONGO_URL;

export class MongoDAO<T extends Serializable> implements DAO<T> {
  model: mongoose.Model<any>;
  constructor(model: mongoose.Model<any>) {
    mongoose.connect(URLMONGO);
    this.model = model;
  }
  async obtener(id: string): Promise<T> {
    const element = await this.model.findById(id);
    if (!element) throw { status: 404, error: `El producto ${id} no existe` };
    return element;
  }
  async obtenerTodos(): Promise<T[]> {
    const docs = await this.model.find({});
    return docs.map((d) => d.toObject());
  }
  async guardar(elementoAGuardar: T): Promise<T> {
    const elementToSave = new this.model({
      ...elementoAGuardar,
    });
    await elementToSave.save();
    return elementToSave;
  }
  async eliminar(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id);
  }
  async modificar(id: string, modificacion: Partial<T>): Promise<T> {
    await this.model.findByIdAndUpdate(id, modificacion);
    const p = await this.obtener(id);
    return p;
  }
}
