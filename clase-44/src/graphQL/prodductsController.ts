import express from "express";
import { ProductDTO } from "../persistencia/types";
import { logger } from "../services/logger";
import { productService } from "../services/productService";

const { Router } = express;

export const products = Router();

const getAll = async (): Promise<ProductDTO[]> => {
  try {
    return await productService.getAll();
  } catch (e) {
    logger.error(e);
    throw "Error al cargar los productos";
  }
};

const addProduct = async ({ data }): Promise<ProductDTO> => {
  try {
    const savedProduct = await productService.addProduct(data);
    return savedProduct;
  } catch (e) {
    logger.error(e);
    throw "Error al agregar el producto";
  }
};

const deleteProduct = async ({ id }): Promise<boolean> => {
  try {
    console.log(id);
    await productService.deleteProductById(id);
    return true;
  } catch (e) {
    logger.error(e);
    throw "Error al eliminar el producto";
  }
};

const updateProduct = async ({ id, data }): Promise<ProductDTO> => {
  try {
    console.log(id);
    console.log(data);
    const updatedProduct = await productService.updateProduct(id, data);
    return updatedProduct;
  } catch (e) {
    logger.error(e);
    throw "Error al actualizar el producto";
  }
};

export const productsController = {
  addProduct,
  deleteProduct,
  getAll,
  updateProduct,
};
