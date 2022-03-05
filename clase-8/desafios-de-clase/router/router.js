/*- Crear un servidor que permita manejar una lista de mascotas y personas. Debe poseer dos rutas principales: '/mascotas' y '/personas', las cuales deben incluir métodos para listar y para agregar recursos:
GET: devolverá la lista requerida en formato objeto.
POST: permitirá guardar una persona ó mascota en arrays propios en memoria, con el siguiente formato: 
Persona -> { "nombre": ..., "apellido": ..., "edad":... }
Mascota -> { "nombre":..., "raza":..., "edad":... }

- Utilizar el Router de express para definir las rutas base, implementando las subrutas en los métodos correspondientes.
- Probar la funcionalidad con Postman.
- El servidor escuchará peticiones en el puerto 8080 y mostrará en la consola un mensaje de conexión que muestre dicho puerto, junto a los mensajes de error si ocurriesen.


*/
const personas = [];
const mascotas = [];

const express = require("express");
const { Router } = express;

const app = express();
const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const rutaMascotas = Router();
const rutaPersonas = Router();

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));

rutaMascotas.get("/", (req, res) => {
  res.send(mascotas);
});

rutaMascotas.post("/", (req, res) => {
  mascotas.push(req.body);
  res.send("added ok.");
});

rutaPersonas.get("/", (req, res) => {
  res.send(personas);
});

rutaPersonas.post("/", (req, res) => {
  personas.push(req.body);
  res.send("added ok.");
});

app.use("/mascotas", rutaMascotas);
app.use("/personas", rutaPersonas);
app.use(express.static(__dirname + "/public"));
/*
Partiendo del ejercicio anterior, generar una carpeta pública 'public' en el servidor, la cual tendrá un archivo index.html. 

En ese archivo se encontrarán dos formularios: uno que permita ingresar mascotas y otro personas utilizando el método post

Probar el ingreso de datos mediante los formularios y con Postman
Verificar los datos cargados en cada caso.
 */
