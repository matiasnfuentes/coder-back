const { api } = require("../api/api");
const axios = require("axios");

// Express config
const express = require("express");
const app = express();
const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));

// Routes
app.use("/api/productos", api);

// Routes
app.get("/", (req, res) => {
  res.render("./formulario.pug");
});

app.post("/productos", (req, res) => {
  const { title, price, thumbnail } = req.body;
  axios
    .post("http://localhost:8080/api/productos", {
      title,
      price,
      thumbnail,
    })
    .then((response) => {
      res.render("./formulario.pug");
    });
});

app.get("/productos", (req, res) => {
  axios.get("http://localhost:8080/api/productos").then((response) => {
    const productos = response.data;
    res.render("./productos.pug", {
      productos,
      partial: "table",
    });
  });
});
