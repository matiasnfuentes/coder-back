import { Carrito } from "../modelo/types";

export interface DAO<T> {
  get(id: string): Promise<T>;
  getAll(): Promise<T[]>;
  save(elementoAGuardar: T): Promise<T>;
  delete(id: string): Promise<void>;
  modificar(id: string, modificacion: Modificacion<T>): Promise<T>;
}

export type Serializable = {
  id?: string;
};
export type Modificacion<T> = Partial<T>;

export type CarritoDTO = Omit<Carrito, "agregarProductos" | "eliminarProducto">;

export type ProductoDTO = {
  nombre: string;
  descripcion: string;
  codigo: string;
  foto: string;
  precio: number;
  stock: number;
} & Serializable;

export type MensajeDTO = {
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
}
