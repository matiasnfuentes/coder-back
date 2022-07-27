import { ADMIN_EMAIL } from "../config/config";
import { Cart } from "../modelo/types";
import { ProductDTO } from "../persistencia/types";
import { CART, DAOFactory } from "../persistencia/DAOFactory";
import { CartDAO } from "../persistencia/mongodb/carritoDAO";
import { CartDTO } from "../persistencia/types";
import { transporter, twilioClient } from "./messageService";
import { productService } from "./productService";

const cartDAO: CartDAO = DAOFactory.createDAO(CART) as CartDAO;

const createCart = async (mail: string): Promise<CartDTO> => {
  let carrito = await getByOwnerEmail(mail);
  if (!carrito) {
    await cartDAO.save(new Cart(mail));
    carrito = await getByOwnerEmail(mail);
  }
  return carrito!!;
};

const recuperarEInstanciarCarrito = async (id: string): Promise<Cart> => {
  const { timestamp, productos, owner } = await getById(id);
  return new Cart(owner, productos, id, timestamp);
};

const getById = async (id: string): Promise<CartDTO> => {
  try {
    return await cartDAO.get(id);
  } catch (e) {
    throw { status: 404, message: `Carrito con id ${id} inexistente` };
  }
};

const getByOwnerEmail = async (email: string): Promise<CartDTO> => {
  try {
    return await cartDAO.getBy("owner", email);
  } catch (e) {
    throw { status: 404, message: `No existe el carrito` };
  }
};

const addProduct = async (
  cartId: string,
  newProduct: ProductDTO
): Promise<CartDTO> => {
  const cart: Cart = await recuperarEInstanciarCarrito(cartId);
  const haveEnoughStock = await productService.haveEnoughStock(newProduct);

  if (haveEnoughStock) {
    productService.decreaseStock(newProduct);
  } else {
    throw `${newProduct.name} doesn't have enough stock to be added to the cart.`;
  }

  cart.addProduct(newProduct);
  return await cartDAO.update(cartId, cart);
};

const deleteByEmail = async (email: string): Promise<void> => {
  await cartDAO.deleteBy("owner", email);
};

const checkout = async ({ email, phoneNumber, names }) => {
  const { productos } = await carritoService.getByOwnerEmail(email);

  // Notificaciones al admin

  const productList = productos.reduce(
    (prev, current) =>
      prev +
      `<div>Código: ${current.code} Nombre: ${current.name} Precio: $${current.price} Cantidad: ${current.stock}</div>`,
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
  createCart,
  addProduct,
  getByOwnerEmail,
  deleteByEmail,
};
