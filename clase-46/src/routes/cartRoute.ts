import Router from "koa-router";
import { carritoController } from "../controller/cartController";

const { obtenerCarrito, addProduct, finalizarCompra } = carritoController;

export default (app) => {
  const cartRoute = new Router({
    prefix: "/api/cart",
  });

  cartRoute.post("/", obtenerCarrito);
  cartRoute.post("/:id/productos", addProduct);
  cartRoute.get("/finalizar", finalizarCompra);
  app.use(cartRoute.routes()).use(cartRoute.allowedMethods());
};
