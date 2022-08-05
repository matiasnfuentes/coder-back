import { productsController } from "../controller/productsController";
import Router from "koa-router";

const { getAll, addProduct, deleteProduct, updateProduct } = productsController;

export default (app) => {
  const productsRoute = new Router({
    prefix: "/api/products",
  });

  productsRoute.get("/", getAll);
  productsRoute.post("/", addProduct);
  productsRoute.put("/:id", updateProduct);
  productsRoute.delete("/:id", deleteProduct);
  app.use(productsRoute.routes()).use(productsRoute.allowedMethods());
};
