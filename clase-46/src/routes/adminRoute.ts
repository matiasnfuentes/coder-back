import Router from "koa-router";
import { agregarProducto } from "../controller/adminController";
import { checkAuthentication } from "../middlewares/checkAuthentication";
import { isAdmin } from "../middlewares/isAdmin";

export default (app) => {
  const adminRoute = new Router({
    prefix: "/admin",
  });

  adminRoute.get(
    "/agregar-producto",
    checkAuthentication,
    isAdmin,
    agregarProducto
  );
  app.use(adminRoute.routes()).use(adminRoute.allowedMethods());
};
