import { CarritoDAO } from "./mongodb/carritoDAO";
import { MensajeDAO } from "./mongodb/mensajeDAO";
import { UserDAO } from "./mongodb/userDAO";

export class DAOFactory {
  static createDAO(type: string) {
    if (type === "carrito") {
      return CarritoDAO.getInstance();
    } else if (type === "mensaje") {
      return MensajeDAO.getInstance();
    } else {
      return UserDAO.getInstance();
    }
  }
}

export const CARRITO = "carrito";
export const MENSAJE = "mensaje";
export const USER = "user";
