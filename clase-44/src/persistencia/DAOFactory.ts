import { CartDAO } from "./mongodb/carritoDAO";
import { MessageDAO } from "./mongodb/mensajeDAO";
import { ProductDAO } from "./mongodb/productoDAO";
import { UserDAO } from "./mongodb/userDAO";

export class DAOFactory {
  static createDAO(type: string) {
    if (type === CART) {
      return CartDAO.getInstance();
    } else if (type === MESSAGE) {
      return MessageDAO.getInstance();
    } else if (type === PRODUCT) {
      return ProductDAO.getInstance();
    } else {
      return UserDAO.getInstance();
    }
  }
}

export const CART = "carrito";
export const MESSAGE = "mensaje";
export const USER = "user";
export const PRODUCT = "product";
