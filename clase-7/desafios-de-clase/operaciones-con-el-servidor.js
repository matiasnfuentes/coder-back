/*

Desarrollar un servidor que permita realizar la suma entre dos números utilizando tres rutas en estos formatos (Ejemplo con números 5 y 6)
a) Ruta get '/api/sumar/5/6
b) Ruta get '/api/sumar?num1=5&num2=62) 
c) Ruta get '/api/operacion/5+6
No hace falta validar los datos a sumar, asumimos que los ingresamos correctamente.
Implementar las rutas post, put y delete en la dirección '/api' respondiendo 'ok' + (post/put/delete) según corresponda. Probar estas rutas con Postman, verificando que el servidor responda con el mensaje correcto.
El servidor escuchará en el puerto 8080 y mostrará todos los mensajes de conexión/error que correspondan.

*/

const express = require("express");
const app = express();
const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));

app.get("/sumar/:num1/:num2", (req, res) => {
  res.send({ suma: parseInt(req.params.num1) + parseInt(req.params.num2) });
});

app.get("/sumar", (req, res) => {
  const num1 = req.query.num1;
  const num2 = req.query.num2;
  res.send({ suma: parseInt(num1) + parseInt(num2) });
});

app.get("/operacion/:operacion", (req, res) => {
  const operacion = req.params.operacion;
  const numeros = operacion.split("+").map((n) => parseInt(n));
  res.send({ suma: numeros[0] + numeros[1] });
});

app.post("/api", (req, res) => {
  res.send("ok post");
});

app.delete("/api", (req, res) => {
  res.send("ok delete");
});

app.put("/api", (req, res) => {
  res.send("ok put");
});
