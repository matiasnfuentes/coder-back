export type Serializable = {
  id?: number;
};
export type Modificacion<T> = Partial<T>;

export type Producto = {
  title: string;
  price: string;
  thumbnail: string;
} & Serializable;

export type Mensaje = {
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

export interface User extends Serializable {
  email: string;
  password: string;
  token?: string;
}
