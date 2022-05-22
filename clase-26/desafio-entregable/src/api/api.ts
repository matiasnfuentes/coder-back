import express from "express";
import { MensajeDAO } from "../persistencia/mensajeDAO";
import { faker } from "@faker-js/faker";
import { Mensaje, Producto } from "../modelo/types";
import { denormalize, normalize, schema } from "normalizr";
faker.locale = "es";

const { Router } = express;

export const api = Router();

const mensajesDAO = new MensajeDAO();

// Fake api
const generarProducto = (): Producto => {
  const producto: Producto = {
    title: faker.commerce.product(),
    price: faker.finance.amount(),
    thumbnail: faker.image.avatar(),
  };
  return producto;
};

const getProductos = (): Producto[] => {
  const productos: Producto[] = [];
  for (let i = 0; i < 5; i++) {
    productos.push(generarProducto());
  }
  return productos;
};

api.get("/productos-test", async (req, res): Promise<void> => {
  res.send(getProductos());
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
  const mensajes: Mensaje[] = await mensajesDAO.obtenerTodos();
  const originalData = { id: "mensajes", mensajes };
  const normalizedData = normalize(originalData, listOfMessages);
  res.send(normalizedData);
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
    console.log(e);
  }
});
