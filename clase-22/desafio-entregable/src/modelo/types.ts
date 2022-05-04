export type Serializable = {
  id?: number;
  timestamp?: number;
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
