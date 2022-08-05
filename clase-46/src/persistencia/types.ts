import { Cart } from "../modelo/types";

export interface DAO<T> {
  get(id: string): Promise<T>;
  getAll(): Promise<T[]>;
  save(elementoAGuardar: T): Promise<T>;
  delete(id: string): Promise<void>;
  update(id: string, modificacion: Modificacion<T>): Promise<T>;
}

export type Serializable = {
  _id?: string;
};
export type Modificacion<T> = Partial<T>;

export type CartDTO = Omit<Cart, "agregarProductos" | "eliminarProducto">;

export type ProductDTO = {
  name: string;
  description: string;
  code: string;
  thumbnail: string;
  price: number;
  stock: number;
} & Serializable;

export type MessageDTO = {
  author: {
    id: string;
    nombre: string;
    apellido: string;
    edad: string;
    alias: string;
    avatar: string;
  };
  text: string;
} & Serializable;

export interface UserDTO extends Serializable {
  email: string;
  password: string;
  nyap: string;
  direccion: string;
  edad: number;
  avatar: string;
  telefono: string;
  token?: string;
  isAdmin?: string;
}
