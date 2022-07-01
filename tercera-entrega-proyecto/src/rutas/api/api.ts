import express from "express";
import { MensajeDAO } from "../../persistencia/mensajeDAO";
import { faker } from "@faker-js/faker";
import { Mensaje, Producto } from "../../modelo/types";
import { normalize, schema } from "normalizr";
import { logger } from "../../logger";
import { carrito } from "./carrito";

faker.locale = "es";

const { Router } = express;

export const api = Router();
api.use("/carrito", carrito);
const mensajesDAO = new MensajeDAO();

// Fake api
const generarProducto = (id): Producto => {
  const producto: Producto = {
    id: Math.round(Math.random() * 10000000).toString(),
    descripcion: "un produc",
    codigo: "ABC" + Math.round(Math.random() * 10000000).toString(),
    stock: Math.ceil(Math.random() * 10),
    nombre: faker.commerce.product(),
    precio: parseFloat(faker.finance.amount()),
    foto: faker.image.avatar(),
  };

  return producto;
};

const getProductos = (): Producto[] => {
  const productos: Producto[] = [];
  for (let i = 0; i < 5; i++) {
    productos.push(generarProducto(i));
  }
  return productos;
};

api.get("/productos-test", async (req, res): Promise<void> => {
  try {
    res.send(getProductos());
  } catch (e) {
    logger.error(e);
    res.status(500).send("Error al cargar los productos");
  }
});

// Send normalized data.

const author = new schema.Entity("author");
const message = new schema.Entity(
  "mensaje",
  { author: author },
  { idAttribute: "_id" }
);
const listOfMessages = new schema.Entity("mensajes", {
  mensajes: [message],
});

api.get("/mensajes", async (req, res): Promise<void> => {
  try {
    const mensajes: Mensaje[] = await mensajesDAO.obtenerTodos();
    const originalData = { id: "mensajes", mensajes };
    const normalizedData = normalize(originalData, listOfMessages);
    res.send(normalizedData);
  } catch (e) {
    logger.error(e);
    res.status(500).send("Error al obtener los mensajes");
  }
});

api.post("/mensajes", async (req, res) => {
  const mensaje = req.body;
  try {
    await mensajesDAO.guardar({
      id: mensaje.timestamp + mensaje.author.id,
      ...mensaje,
    });
    res.send("guardado ok");
  } catch (e) {
    logger.error(e);
    res.status(500).send("Error al guardar los mensajes");
  }
});
