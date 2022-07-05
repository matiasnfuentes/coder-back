import { ADMIN_EMAIL } from "../config/config";
import { Carrito, Producto } from "../modelo/types";
import { CarritoDAO } from "../persistencia/carritoDAO";
import { CarritoDTO } from "../persistencia/types";
import { transporter, twilioClient } from "./messageService";

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

const checkout = async ({ email, phoneNumber, names }) => {
  const { productos } = await carritoService.getByOwnerEmail(email);

  // Notificaciones al admin

  const productList = productos.reduce(
    (prev, current) =>
      prev +
      `<div>Código: ${current.codigo} Nombre: ${current.nombre} Precio: $${current.precio} Cantidad: ${current.stock}</div>`,
    ""
  );
  const mailOptions = {
    from: "E-commerce",
    to: ADMIN_EMAIL,
    subject: "Nuevo pedido",
    html: `<h1>Se ha generado un nuevo pedido:</h1>
      ${productList}`,
  };
  const adminWppNotification = {
    body: `Nuevo pedido de ${names}. Mail: ${email}`,
    from: "whatsapp:+14155238886",
    to: "whatsapp:+5491123458427",
  };

  twilioClient.messages.create(adminWppNotification);
  transporter.sendMail(mailOptions);

  // Notificación al usuario
  const userNotification = {
    body: `Tu pedido al e-commerce ha sido recibido y está en proceso.`,
    from: "+19895348213",
    to: phoneNumber,
  };
  twilioClient.messages.create(userNotification);

  // Eliminación del carrito
  await carritoService.deleteByEmail(email);
};

export const carritoService = {
  checkout,
  crearCarrito,
  agregarProductos,
  getByOwnerEmail,
  deleteByEmail,
};
