/*

Crear un servidor que permita elegir y subir un archivo utilizando un formulario servido desde su espacio público.

Dicho archivo se almacenará en una carpeta propia del servidor llamada 'uploads'.
El nombre del archivo guardado se formará con el nombre original anteponiéndole un timestamp (Date.now()) seguido con un guión. Ej: 1610894554093-clase1.zip

Utilizar express y multer en un proyecto de servidor que escuche en el puerto 8080.
*/

//Multer config

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage: storage });

// Express config
const express = require("express");
const { Router } = express;
const app = express();
const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));

// Endpoints
const api = Router();

api.get("/", (req, res) => {
  res.send("Api ok");
});

api.post("/uploadfile", upload.single("myFile"), (req, res, next) => {
  const file = req.file;
  console.log(file);
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send(file);
});

app.use("/api", api);
app.use(express.static(__dirname + "/public"));
