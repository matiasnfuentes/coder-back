import express from "express";
import { crearTablas } from "../persistencia/crearTablas";
import { MensajeDAO } from "../persistencia/mensajeDAO";
import { ProductoDAO } from "../persistencia/productoDAO";
const { Router } = express;

export const api = Router();
// Intenta crear las tablas en caso de que no existan
crearTablas();
const mensajesDAO = new MensajeDAO();
const productoDAO = new ProductoDAO();

api.get("/productos", async (req, res): Promise<void> => {
  res.send(await productoDAO.obtenerTodos());
});

api.post("/productos", async (req, res) => {
  const { title, price, thumbnail } = req.body;
  try {
    await productoDAO.guardar({
      title,
      price,
      thumbnail,
      timestamp: Date.now(),
    });
    res.send(await productoDAO.obtenerTodos());
  } catch (e) {
    console.log(e);
  }
});

api.get("/mensajes", async (req, res): Promise<void> => {
  res.send(await mensajesDAO.obtenerTodos());
});

api.post("/mensajes", async (req, res) => {
  const { mensaje, mail, timestamp } = req.body;
  try {
    await mensajesDAO.guardar({
      mensaje,
      mail,
      timestamp,
    });
  } catch (e) {
    console.log(e);
  }
});
