const express = require("express");
const PORT = 8080;
const app = express();

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));

// Motor de plantillas
app.set("views", "./views");
app.set("view engine", "ejs");

// Routes
app.use("/datos", (req, res) => {
  const { valor, maximo, minimo, titulo } = req.query;
  res.render("index.ejs", { valor, maximo, minimo, titulo });
});
