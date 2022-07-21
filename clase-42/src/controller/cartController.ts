import { Router } from "express";
import { UserDTO } from "../persistencia/types";
import { carritoService } from "../services/cartService";

export const carrito = Router();

const addProduct = async (req, res) => {
  try {
    const carritoId: string = req.params.id;
    const { _id, name, price, cantidad, description, code, thumbnail } =
      req.body;
    await carritoService.addProduct(carritoId, {
      _id,
      name,
      price,
      stock: cantidad,
      description,
      code,
      thumbnail,
    });
    res.redirect("/carrito");
  } catch (e: any) {
    res.status(e.status || 500).send(e.message);
  }
};

const checkout = async (req, res) => {
  const { email, nyap, telefono } = req.user as UserDTO;
  try {
    carritoService.checkout({ names: nyap, email, phoneNumber: telefono });
    res.redirect("/");
  } catch (e) {
    res.status(500).send("No se pudo concretar la compra");
  }
};

const obtenerCarrito = async (req, res) => {
  const { email } = req.user as UserDTO;
  try {
    res.send(await carritoService.createCart(email));
  } catch (e) {
    res.status(500).send("No se pudo crear el carrito");
  }
};
export const carritoController = {
  finalizarCompra: checkout,
  obtenerCarrito,
  addProduct,
};
