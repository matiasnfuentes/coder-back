import { mariaDBOptions } from "../options/mariaDBOptions";
import { sqlLiteOptions } from "../options/sqliteOptions";
import { knex } from "knex";

const mariaDB = knex(mariaDBOptions);
const sqlite = knex(sqlLiteOptions);

export const crearTablas = async () => {
  try {
    await mariaDB.schema.createTable("productos", (table) => {
      table.increments("id");
      table.bigInteger("timestamp");
      table.string("title");
      table.float("price");
      table.text("thumbnail");
    });
  } catch (e: any) {
    console.log(e.sqlMessage);
  } finally {
    mariaDB.destroy();
  }

  try {
    await sqlite.schema.createTable("mensajes", (table) => {
      table.increments("id");
      table.bigInteger("timestamp");
      table.string("mensaje");
      table.string("mail");
    });
  } catch (e: any) {
    console.log(
      "Ocurrió un error al crear la tabla mensajes, puede que la misma ya esté creada"
    );
  } finally {
    mariaDB.destroy();
  }
};
