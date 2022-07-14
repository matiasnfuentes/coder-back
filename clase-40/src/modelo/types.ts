import { ProductoDTO, Serializable } from "../persistencia/types";

export interface ICarrito extends Serializable {
  productos: ProductoDTO[];
  agregarProductos: (productos: ProductoDTO[]) => void;
  eliminarProducto: (productoID: string) => ProductoDTO;
}

export class Carrito implements ICarrito {
  productos: ProductoDTO[];
  id?: string;
  timestamp?: number;
  owner: string;
  constructor(
    owner: string,
    productos: ProductoDTO[] = [],
    id?: string,
    timestamp?: number
  ) {
    this.id = id;
    this.timestamp = timestamp;
    this.productos = productos;
    this.owner = owner;
  }

  agregarProductos(nuevosProductos: ProductoDTO[]): ProductoDTO[] {
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
  eliminarProducto(productoID: string): ProductoDTO {
    const i: number = this.productos.findIndex((p) => p.id === productoID);
    if (i === -1)
      throw { message: "El producto a eliminar no existe en el carrito" };
    return this.productos.splice(i, 1)[0];
  }
}
