import { ProductDTO, Serializable } from "../persistencia/types";

export interface ICart extends Serializable {
  productos: ProductDTO[];
  addProducts: (products: ProductDTO[]) => void;
  addProduct: (product: ProductDTO) => void;
  deleteProduct: (productoID: string) => ProductDTO;
}

export class Cart implements ICart {
  productos: ProductDTO[];
  _id?: string;
  timestamp?: number;
  owner: string;
  constructor(
    owner: string,
    productos: ProductDTO[] = [],
    _id?: string,
    timestamp?: number
  ) {
    this._id = _id;
    this.timestamp = timestamp;
    this.productos = productos;
    this.owner = owner;
  }

  addProduct(newProduct: ProductDTO): ProductDTO[] {
    const indice = this.productos.findIndex(
      (currentProduct) => currentProduct._id === newProduct._id
    );
    if (indice === -1) {
      this.productos.push(newProduct);
    } else {
      this.productos[indice].stock += newProduct.stock;
    }
    return this.productos;
  }

  addProducts(products: ProductDTO[]): ProductDTO[] {
    products.forEach((newProduct) => this.addProduct(newProduct));
    return this.productos;
  }

  //Elimina un producto del carrito y lo devuelve
  deleteProduct(productoID: string): ProductDTO {
    const i: number = this.productos.findIndex((p) => p._id === productoID);
    if (i === -1)
      throw { message: "El producto a eliminar no existe en el carrito" };
    return this.productos.splice(i, 1)[0];
  }
}
