import express from "express";
import { ProductDTO } from "../persistencia/types";
import { logger } from "../services/logger";
import { productService } from "../services/productService";

const { Router } = express;

export const products = Router();

const getAll = async (req, res): Promise<void> => {
  try {
    res.send(await productService.getAll());
  } catch (e) {
    logger.error(e);
    res.status(500).send("Error al cargar los productos");
  }
};

const addProduct = async (req, res): Promise<void> => {
  try {
    const product = req.body as ProductDTO;
    const savedProduct = await productService.addProduct(product);
    res.send(savedProduct);
  } catch (e) {
    logger.error(e);
    res.status(500).send("Error al cargar los productos");
  }
};

const deleteProduct = async (req, res): Promise<void> => {
  try {
    const { id } = req.params;
    await productService.deleteProductById(id);
    // @TECH-DEB: This should redirect the user to the admin route
    res.send("Deleted ok");
  } catch (e) {
    logger.error(e);
    res.status(500).send("Error al eliminar el producto");
  }
};

const updateProduct = async (req, res): Promise<void> => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedProduct = await productService.updateProduct(id, updates);
    res.send(updatedProduct);
  } catch (e) {
    logger.error(e);
    res.status(500).send("Error al modificar el producto");
  }
};

export const productsController = {
  addProduct,
  deleteProduct,
  getAll,
  updateProduct,
};
