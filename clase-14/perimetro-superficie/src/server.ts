/*

Realizar los endpoints get que permitan recibir las peticiones de cálculo con los parámetros correspondientes.
La respuesta será en formato objeto y representará el tipo de cálculo, la figura, los parámetros de entrada
 y el resultado. 

 */

import express, { Router } from "express";
import Perimetro from "./perimetro";
import Superficie from "./superficie";

const app = express();
const perimetro = Router();
const superficie = Router();
app.use("/perimetro", perimetro);
app.use("/superficie", superficie);

app.get("/", (req, res) => {
  res.send("connected");
});

perimetro.get("/cuadrado/:lado", (req, res) => {
  const { lado } = req.params;
  res.send({ perimetro: Perimetro.cuadrado({ lado: parseInt(lado) }) });
});

perimetro.get("/rectangulo/:base/:altura", (req, res) => {
  const { base, altura } = req.params;
  res.send({
    perimetro: Perimetro.rectangulo({
      base: parseInt(base),
      altura: parseInt(altura),
    }),
  });
});

perimetro.get("/circulo/:radio", (req, res) => {
  const { radio } = req.params;
  res.send({
    perimetro: Perimetro.circulo({
      radio: parseInt(radio),
    }),
  });
});

superficie.get("/cuadrado/:lado", (req, res) => {
  const { lado } = req.params;
  res.send({ superficie: Superficie.cuadrado({ lado: parseInt(lado) }) });
});

superficie.get("/rectangulo/:base/:altura", (req, res) => {
  const { base, altura } = req.params;
  res.send({
    superficie: Superficie.rectangulo({
      base: parseInt(base),
      altura: parseInt(altura),
    }),
  });
});

superficie.get("/circulo/:radio", (req, res) => {
  const { radio } = req.params;
  res.send({
    superficie: Superficie.circulo({
      radio: parseInt(radio),
    }),
  });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`conectado al puerto: ${PORT}`);
});
