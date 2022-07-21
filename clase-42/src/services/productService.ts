import { products } from "../controller/productsController";
import { DAOFactory, PRODUCT } from "../persistencia/DAOFactory";
import { ProductDAO } from "../persistencia/mongodb/productoDAO";
import { ProductDTO } from "../persistencia/types";

const productDAO = DAOFactory.createDAO(PRODUCT) as ProductDAO;

const getAll = async (): Promise<ProductDTO[]> => {
  const p = await productDAO.getAll();
  return p;
};

const getById = async (_id: string): Promise<ProductDTO> =>
  await productDAO.get(_id);

const addProduct = async (product: ProductDTO): Promise<ProductDTO> => {
  return await productDAO.save(product);
};

const deleteProductById = async (id: string): Promise<void> => {
  await productDAO.deleteBy("_id", id);
};

const decreaseStock = async (product: ProductDTO): Promise<void> => {
  if (!product._id) throw "Product id missing";
  const storedProduct: ProductDTO = await getById(product._id);
  const newStock = storedProduct.stock - product.stock;
  await productDAO.update(product._id, { stock: newStock });
};

const haveEnoughStock = async (product: ProductDTO): Promise<Boolean> => {
  if (!product._id) throw "Product id missing";
  const storedProduct: ProductDTO = await getById(product._id);
  return storedProduct.stock >= product.stock;
};

const updateProduct = async (
  id: string,
  updates: Partial<ProductDTO>
): Promise<ProductDTO> => {
  return await productDAO.update(id, updates);
};

export const productService = {
  addProduct,
  decreaseStock,
  deleteProductById,
  getAll,
  haveEnoughStock,
  updateProduct,
};
