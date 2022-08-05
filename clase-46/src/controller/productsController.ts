import { ProductDTO } from "../persistencia/types";
import { logger } from "../services/logger";
import { productService } from "../services/productService";

const getAll = async (ctx): Promise<void> => {
  try {
    ctx.body = await productService.getAll();
  } catch (e) {
    logger.error(e);
    ctx.throw(500, "Error al cargar los productos");
  }
};

const addProduct = async (ctx): Promise<void> => {
  try {
    const product = ctx.request.body as ProductDTO;
    const savedProduct = await productService.addProduct(product);
    ctx.body = savedProduct;
  } catch (e) {
    logger.error(e);
    ctx.throw(500, "Error al cargar los productos");
  }
};

const deleteProduct = async (ctx): Promise<void> => {
  try {
    const { id } = ctx.params;
    await productService.deleteProductById(id);
    // @TECH-DEB: This should redirect the user to the admin route
    ctx.body = "Deleted ok";
  } catch (e) {
    logger.error(e);
    ctx.throw(500, "Error al eliminar el producto");
  }
};

const updateProduct = async (ctx): Promise<void> => {
  try {
    const { id } = ctx.params;
    const updates = ctx.body;
    const updatedProduct = await productService.updateProduct(id, updates);
    ctx.body = updatedProduct;
  } catch (e) {
    logger.error(e);
    ctx.throw(500, "Error al modificar el producto");
  }
};

export const productsController = {
  addProduct,
  deleteProduct,
  getAll,
  updateProduct,
};
