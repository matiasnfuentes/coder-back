// Express config
const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));

// Motor de plantilla
app.engine("txt", (filePath, options, callback) => {
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(new Error(err));
    const keys = ["titulo", "mensaje", "autor", "version"];
    let rendered = content.toString();
    keys.forEach((k) => {
      rendered = rendered.replace(`^^${k}$$`, options[k]);
    });
    return callback(null, rendered);
  });
});

app.set("views", "./views"); // especifica el directorio de vistas
app.set("view engine", "txt"); // registra el motor de plantillas

// Routes
app.get("/cte1", function (req, res) {
  res.render("index", {
    titulo: "Motor custom",
    mensaje: "Este es un motor custom hecho para coderhouse",
    autor: "Matías N. Fuentes",
    version: 1,
  });
});
