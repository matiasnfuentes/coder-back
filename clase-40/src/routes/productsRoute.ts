import express from "express";

import { productsController } from "../controller/productsController";

const { Router } = express;
const { getAll } = productsController;

export const productsRoute = Router();

productsRoute.get("/list", getAll);
