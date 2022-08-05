import { Router } from "express";
import { UserDTO } from "../persistencia/types";
import { carritoService } from "../services/cartService";

export const carrito = Router();

const addProduct = async (ctx) => {
  try {
    const carritoId: string = ctx.params.id;
    const { _id, name, price, cantidad, description, code, thumbnail } =
      ctx.request.body;
    await carritoService.addProduct(carritoId, {
      _id,
      name,
      price,
      stock: cantidad,
      description,
      code,
      thumbnail,
    });
    ctx.redirect("/carrito");
  } catch (e: any) {
    ctx.trhow(e.status || 500, e.message);
  }
};

const checkout = async (ctx) => {
  const { email, nyap, telefono } = ctx.state.user as UserDTO;
  try {
    carritoService.checkout({ names: nyap, email, phoneNumber: telefono });
    ctx.redirect("/");
  } catch (e) {
    ctx.throw(500, "No se pudo concretar la compra");
  }
};

const obtenerCarrito = async (ctx) => {
  const { email } = ctx.state.user as UserDTO;
  try {
    ctx.body = await carritoService.createCart(email);
  } catch (e) {
    ctx.throw(500, "No se pudo crear el carrito");
  }
};
export const carritoController = {
  finalizarCompra: checkout,
  obtenerCarrito,
  addProduct,
};
