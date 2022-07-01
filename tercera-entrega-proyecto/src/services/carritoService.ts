import { Carrito, Producto } from "../modelo/types";
import { CarritoDAO } from "../persistencia/carritoDAO";
import { CarritoDTO } from "../persistencia/types";

const carritoDAO = new CarritoDAO();

const crearCarrito = async (mail: string): Promise<CarritoDTO> => {
  let carrito = await carritoDAO.getByOwnerEmail(mail);
  if (!carrito) {
    await carritoDAO.guardar(new Carrito(mail));
    carrito = await carritoDAO.getByOwnerEmail(mail);
  }
  return carrito!!;
};

const recuperarEInstanciarCarrito = async (id: string): Promise<Carrito> => {
  const { timestamp, productos, owner } = await obtener(id);
  return new Carrito(owner, productos, id, timestamp);
};

const obtener = async (id: string): Promise<CarritoDTO> => {
  try {
    return await carritoDAO.obtener(id);
  } catch (e) {
    throw { status: 404, message: `Carrito con id ${id} inexistente` };
  }
};

const getByOwnerEmail = async (email: string): Promise<CarritoDTO> => {
  try {
    return await carritoDAO.getByOwnerEmail(email)!!;
  } catch (e) {
    throw { status: 404, message: `No existe el carrito` };
  }
};

const agregarProductos = async (
  id: string,
  nuevosProductos: Producto[]
): Promise<CarritoDTO> => {
  const carrito: Carrito = await recuperarEInstanciarCarrito(id);

  /* Los productos están mockeados, por el momento no voy a descontar stock

  for (const producto of nuevosProductos) {
    await this.productoService.modificarStock(producto, true);
  }*/

  carrito.agregarProductos(nuevosProductos);
  return await carritoDAO.modificar(id, carrito);
};

const deleteByEmail = async (mail: string): Promise<void> => {
  /* Los productos están mockeados, por ahora no hay que sumar stock 
  
  const productos: Producto[] = await this.obtenerProductos(id);
  for (const producto of productos) {
    await this.productoService.modificarStock(producto);
  }*/

  await carritoDAO.deleteByEmail(mail);
};

export const CarritoService = {
  crearCarrito,
  agregarProductos,
  getByOwnerEmail,
  deleteByEmail,
};
