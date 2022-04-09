import { Producto } from "../modelo/types";
import { SqlDAO } from "./sqlDAO";
import { mariaDBOptions } from "../options/mariaDBOptions";

export class ProductoDAO extends SqlDAO<Producto> {
  constructor() {
    super("productos", mariaDBOptions);
  }
}
