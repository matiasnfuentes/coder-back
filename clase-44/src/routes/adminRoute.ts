import { Router } from "express";
import { agregarProducto } from "../controller/adminController";
import { checkAuthentication } from "../middlewares/checkAuthentication";
import { isAdmin } from "../middlewares/isAdmin";

export const adminRoute = Router();

adminRoute.get(
  "/agregar-producto",
  checkAuthentication,
  isAdmin,
  agregarProducto
);
