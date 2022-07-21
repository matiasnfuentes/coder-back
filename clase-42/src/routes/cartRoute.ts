import { Router } from "express";
import { carritoController } from "../controller/cartController";

export const cartRoute = Router();
const { obtenerCarrito, addProduct, finalizarCompra } = carritoController;

cartRoute.post("/", obtenerCarrito);
cartRoute.post("/:id/productos", addProduct);
cartRoute.get("/finalizar", finalizarCompra);
