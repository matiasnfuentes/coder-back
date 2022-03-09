// Express config
const express = require("express");
const fs = require("fs");
const app = express();
const handleBars = require("express-handlebars");
const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));

app.engine(
  "hbs",
  handleBars.engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views",
  })
);

app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("index", {
    nombre: "Pepe",
    apellido: "suape",
    edad: 12,
    email: "mail@mail.com",
    telefono: "4212-3412",
  });
});
