/*
Considere la siguiente frase: ‘Frase inicial’
Realizar una aplicación de servidor node.js con express que incorpore las siguientes rutas:
GET '/api/frase': devuelve un objeto que como campo ‘frase’ contenga la frase completa
GET '/api/palabras/:pos': devuelve un objeto que como campo ‘buscada’ contenga la palabra hallada en la frase en la posición dada (considerar que la primera palabra es la #1que se vaya a guardar.
POST '/api/palabras': recibe un objeto con una palabra bajo el campo ‘palabra’ y la agrega al final de la frase. Devuelve un objeto que como campo ‘agregada’ contenga la palabra agregada, y en el campo ‘pos’ la posición en que se agregó dicha palabra.
PUT '/api/palabras/:pos': recibe un objeto con una palabra bajo el campo ‘palabra’ y reemplaza en la frase aquella hallada en la posición dada. Devuelve un objeto que como campo ‘actualizada’ contenga la nueva palabra, y en el campo ‘anterior’ la anterior.
DELETE '/api/palabras/:pos': elimina una palabra en la frase, según la posición dada (considerar que la primera palabra tiene posición #1).

Aclaraciones:
Utilizar Postman para probar la funcionalidad.
El servidor escuchará peticiones en el puerto 8080 y mostrará en la consola un mensaje de conexión que muestre dicho puerto, junto a los mensajes de error si ocurriesen.
*/

const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));

let frase = "Frase inicial";

app.get("/frase", (req, res) => {
  res.send({ frase });
});

app.get("/palabras/:pos", (req, res) => {
  const numeroDeLetra = req.params.pos;
  res.send({ buscada: frase.split(" ")[numeroDeLetra] });
});

app.post("/palabras", (req, res) => {
  const palabraAAgregar = req.body.palabra;
  frase += ` ${palabraAAgregar}`;
  const posicion = frase.split(" ").length - 1;
  res.send({ agregada: palabraAAgregar, posicion });
});

app.post("/palabras/:pos", (req, res) => {
  const posicion = parseInt(req.params.pos);
  const palabraAAgregar = req.body.palabra;
  const palabras = frase.split(" ");
  const anterior = palabras[posicion];
  palabras.splice(posicion, 1, palabraAAgregar);
  frase = palabras.join(" ");
  res.send({ actualizada: palabraAAgregar, anterior });
});

app.delete("/palabras/:pos", (req, res) => {
  const posicion = parseInt(req.params.pos);
  const palabras = frase.split(" ");
  palabras.splice(posicion, 1);
  frase = palabras.join(" ");
  res.send("eliminada ok");
});
