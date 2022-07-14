import { Router } from "express";
import { carritoController } from "../controller/carritoController";

export const cartRoute = Router();
const { obtenerCarrito, agregarProductos, finalizarCompra } = carritoController;

cartRoute.post("/", obtenerCarrito);
cartRoute.post("/:id/productos", agregarProductos);
cartRoute.get("/finalizar", finalizarCompra);
