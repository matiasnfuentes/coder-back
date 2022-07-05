import express from "express";
import { logger } from "../services/logger";
import { productService } from "../services/productService";

const { Router } = express;

export const products = Router();

const getAll = async (req, res): Promise<void> => {
  try {
    res.send(productService.getAll());
  } catch (e) {
    logger.error(e);
    res.status(500).send("Error al cargar los productos");
  }
};

export const productsController = { getAll };
