const express = require("express");
const { Router } = express;

module.exports = (() => {
  const api = Router();

  let productos = [];
  let lastId = 1;

  const buscarProducto = (id) => productos.find((p) => p.id === id);

  api.get("/", (req, res) => {
    res.send(productos);
  });

  api.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const producto = buscarProducto(id);
    if (!producto) return res.send({ error: "producto no encontrado" });
    res.send(producto);
  });

  api.post("/", (req, res) => {
    const producto = { ...req.body, id: lastId };
    lastId++;
    productos.push(producto);
    res.send(producto);
  });

  api.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const nuevosDatos = req.body;
    const producto = buscarProducto(id);
    if (!producto) return res.send({ error: "producto no encontrado" });
    productos = [
      ...productos.filter((p) => p.id !== id),
      { ...producto, ...nuevosDatos },
    ];
    res.send(productos);
  });

  api.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    if (!buscarProducto(id))
      return res.send({ error: "producto no encontrado" });
    productos = productos.filter((p) => p.id !== id);
    res.send(productos);
  });

  return api;
})();
