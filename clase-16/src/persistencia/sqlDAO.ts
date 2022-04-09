import { Modificacion, Serializable } from "../modelo/types";
import { DbOptions } from "../options/types";
import { knex } from "knex";

export class SqlDAO<T extends Serializable> {
  tabla: string;
  config: DbOptions;

  constructor(tabla: string, config: DbOptions) {
    this.tabla = tabla;
    this.config = config;
  }

  async obtenerTodos(): Promise<T[]> {
    const dbInstance = knex(this.config);
    try {
      const rows = await dbInstance.from(this.tabla).select("*");
      return rows.map((r) => ({ ...r }));
    } catch (e) {
      console.log(e);
      throw {
        message: `No se puede leer la db, o todavía no hay nada almacenado`,
        status: 500,
      };
    } finally {
      dbInstance.destroy();
    }
  }

  async guardar(elementoAGuardar: T): Promise<void> {
    const dbInstance = knex(this.config);
    try {
      return await dbInstance(this.tabla).insert({
        ...elementoAGuardar,
        timestamp: Date.now(),
      });
    } catch (e) {
      console.log(e);
      throw {
        message: `No se puede leer la db, o todavía no hay nada almacenado`,
        status: 500,
      };
    } finally {
      dbInstance.destroy();
    }
  }

  async obtener(id: number): Promise<T> {
    const dbInstance = knex(this.config);
    try {
      return await dbInstance
        .from(this.tabla)
        .select("*")
        .where("id", "=", id)[0];
    } catch (e) {
      throw {
        message: `No existe elemento con ese id`,
        status: 404,
      };
    } finally {
      dbInstance.destroy();
    }
  }

  async eliminar(id: number): Promise<void> {
    const dbInstance = knex(this.config);
    try {
      await dbInstance.from(this.tabla).where("id", "=", id).del();
    } catch (e) {
      throw {
        message: `No existe elemento con ese id`,
        status: 404,
      };
    } finally {
      dbInstance.destroy();
    }
  }

  async modificar(id: number, modificacion: Modificacion<T>): Promise<T> {
    const dbInstance = knex(this.config);
    try {
      return await dbInstance
        .from(this.tabla)
        .where("id", id)
        .update(
          {
            ...modificacion,
            timestamp: Date.now(),
          },
          "*",
          { includeTriggerModifications: true }
        )[0];
    } catch (e) {
      throw {
        message: `No existe elemento con ese id`,
        status: 404,
      };
    } finally {
      dbInstance.destroy();
    }
  }
}
