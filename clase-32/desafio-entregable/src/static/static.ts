// Rutas de archivos estáticos, esto no interesa

import express from "express";
import path from "path";

const { Router } = express;

export const staticRoute = Router();

staticRoute.get("/login.js", (req, res) => {
  res.sendFile(path.resolve("public/login.js"));
});
staticRoute.get("/index.js", (req, res) => {
  res.sendFile(path.resolve("public/index.js"));
});
staticRoute.get("/register.js", (req, res) => {
  res.sendFile(path.resolve("public/register.js"));
});
staticRoute.get("/tabla.hbs", (req, res) => {
  res.sendFile(path.resolve("public/views/tabla.hbs"));
});
