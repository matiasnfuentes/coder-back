import mongoose from "mongoose";
import { MONGO_URL } from "../../config/config";
import { Serializable } from "..//types";
import { DAO } from "../types";

export const URLMONGO: string = MONGO_URL;

export class MongoDAO<T extends Serializable> implements DAO<T> {
  model: mongoose.Model<any>;
  constructor(model: mongoose.Model<any>) {
    mongoose.connect(URLMONGO);
    this.model = model;
  }

  async get(id: string): Promise<T> {
    const element = await this.model.findById(id);
    if (!element) throw { status: 404, error: `El producto ${id} no existe` };
    return element.toObject();
  }

  async getBy(field: string, value: string | number): Promise<T> {
    const element = await this.model.findOne({ [field]: value });
    return element;
  }

  async getAll(): Promise<T[]> {
    const docs = await this.model.find({});
    return docs.map((d) => d.toObject());
  }

  async save(elementoAGuardar: T): Promise<T> {
    const elementToSave = new this.model({
      ...elementoAGuardar,
    });

    return await elementToSave.save();
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id);
  }

  async deleteBy(field: string, value: string | number): Promise<void> {
    await this.model.findOneAndDelete({ [field]: value });
  }

  async update(id: string, modificacion: Partial<T>): Promise<T> {
    await this.model.findByIdAndUpdate(id, modificacion);
    const p = await this.get(id);
    return p;
  }
}
