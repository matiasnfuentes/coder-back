import express from "express";

import { productsController } from "../controller/productsController";

const { Router } = express;
const { getAll, addProduct, deleteProduct, updateProduct } = productsController;

export const productsRoute = Router();

productsRoute.get("/", getAll);
productsRoute.post("/", addProduct);
productsRoute.put("/:id", updateProduct);
productsRoute.delete("/:id", deleteProduct);
