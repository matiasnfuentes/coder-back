const express = require("express");
const { Router } = express;

const api = Router();

let productos = [];
let lastId = 1;

api.get("/", (req, res) => {
  res.send(productos);
});

api.post("/", (req, res) => {
  const producto = { ...req.body, id: lastId };
  lastId++;
  productos.push(producto);
  res.send(productos);
});

exports.api = api;
