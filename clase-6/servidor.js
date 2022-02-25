/*Realizar un proyecto de servidor basado en node.js que utilice el módulo express e implemente los siguientes endpoints en el puerto 8080:
Ruta get '/productos' que devuelva un array con todos los productos disponibles en el servidor
Ruta get '/productoRandom' que devuelva un producto elegido al azar entre todos los productos disponibles*/
const express = require("express");
const fs = require("fs");
const app = express();

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));

app.get("/productos", (req, res) => {
  fs.promises.readFile("./productos.txt").then((productos) => {
    res.send(JSON.parse(productos));
  });
});

app.get("/productoRandom", (req, res) => {
  fs.promises.readFile("./productos.txt").then((productos) => {
    const arrayProductos = JSON.parse(productos);
    const idRandom = Math.round(Math.random() * 2);
    res.send(arrayProductos[idRandom]);
  });
});
