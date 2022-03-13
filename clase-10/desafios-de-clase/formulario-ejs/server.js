const express = require("express");
const PORT = 8080;
const app = express();

//configuración del servidor
const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Motor de plantillas
app.set("views", "./views");
app.set("view engine", "ejs");

const personas = [];

// Routes
app.get("/", (req, res) => {
  res.render("index.ejs", { personas: personas });
});

app.post("/personas", (req, res) => {
  const { nombre, apellido, edad } = req.body;
  personas.push({ nombre, apellido, edad });
  res.render("index.ejs", { personas: personas });
});
