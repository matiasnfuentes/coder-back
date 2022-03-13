const { api } = require("../api/api");
const axios = require("axios");
const hbs = require("hbs");

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

// Motor de plantilla
hbs.registerPartials(__dirname + "/views/partials", function (err) {});
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

// Api
app.use("/api/productos", api);

// Routes
app.get("/", (req, res) => {
  res.render("index.hbs");
});

app.use(express.static(__dirname + "/public"));

app.post("/productos", (req, res) => {
  const { title, price, thumbnail } = req.body;
  axios
    .post("http://localhost:8080/api/productos", {
      title,
      price,
      thumbnail,
    })
    .then(() => res.render("index.hbs"));
});

app.get("/productos", (req, res) => {
  axios.get("http://localhost:8080/api/productos").then((response) => {
    const productos = response.data;
    res.render("./productos.hbs", { productos });
  });
});
