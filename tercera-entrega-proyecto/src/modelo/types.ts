export type Serializable = {
  id?: string;
};
export type Modificacion<T> = Partial<T>;

export type Producto = {
  nombre: string;
  descripcion: string;
  codigo: string;
  foto: string;
  precio: number;
  stock: number;
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
  nyap: string;
  direccion: string;
  edad: number;
  avatar: string;
  telefono: string;
  token?: string;
}

export interface ICarrito extends Serializable {
  productos: Producto[];
  agregarProductos: (productos: Producto[]) => void;
  eliminarProducto: (productoID: string) => Producto;
}

export class Carrito implements ICarrito {
  productos: Producto[];
  id?: string;
  timestamp?: number;
  owner: string;
  constructor(
    owner: string,
    productos: Producto[] = [],
    id?: string,
    timestamp?: number
  ) {
    this.id = id;
    this.timestamp = timestamp;
    this.productos = productos;
    this.owner = owner;
  }

  agregarProductos(nuevosProductos: Producto[]): Producto[] {
    nuevosProductos.forEach((productoNuevo) => {
      const indice = this.productos.findIndex(
        (productoActual) => productoActual.id === productoNuevo.id
      );
      if (indice === -1) {
        this.productos.push(productoNuevo);
      } else {
        this.productos[indice].stock += productoNuevo.stock;
      }
    });
    return this.productos;
  }

  //Elimina un producto del carrito y lo devuelve
  eliminarProducto(productoID: string): Producto {
    const i: number = this.productos.findIndex((p) => p.id === productoID);
    if (i === -1)
      throw { message: "El producto a eliminar no existe en el carrito" };
    return this.productos.splice(i, 1)[0];
  }
}
