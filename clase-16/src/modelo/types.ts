export type Serializable = {
  id?: number;
  timestamp?: number;
};
export type Modificacion<T> = Partial<T>;

export type Producto = {
  title: string;
  price: number;
  thumbnail: string;
} & Serializable;

export type Mensaje = {
  mensaje: string;
  mail: string;
} & Serializable;
