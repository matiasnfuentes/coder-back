import { Mensaje } from "../modelo/types";
import { sqlLiteOptions } from "../options/sqliteOptions";
import { SqlDAO } from "./sqlDAO";

export class MensajeDAO extends SqlDAO<Mensaje> {
  constructor() {
    super("mensajes", sqlLiteOptions);
  }
}
