const { api } = require("./api/api");
const fs = require("fs");
const axios = require("axios");
const hbs = require("hbs");
const express = require("express");
const { Server: IOServer } = require("socket.io");
const { Server: HttpServer } = require("http");

// Server config
const app = express();
const server = new HttpServer(app);
const io = new IOServer(server);
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Motor de plantilla
hbs.registerPartials(__dirname + "/views/partials/", function (err) {});
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

// Routes
app.use("/api/productos", api);
app.use(express.static(__dirname + "/public"));

// Socket events

io.on("connection", (socket) => {
  console.log("¡Nuevo cliente conectado!");

  // Envio los datos inciales
  axios.get("http://localhost:8080/api/productos").then((respuestaDeApi) => {
    fs.promises
      .readFile("./data/messages.txt", "utf-8")
      .then((respuestaDelArchivo) => {
        const mensajes = JSON.parse(respuestaDelArchivo);
        socket.emit("connected", {
          mensajes,
          productos: respuestaDeApi.data,
        });
      });
  });

  // Manipulación de productos

  socket.on("agregarProducto", (data) => {
    const { title, price, thumbnail } = data;
    axios
      .post("http://localhost:8080/api/productos", {
        title,
        price,
        thumbnail,
      })
      .then((res) =>
        io.sockets.emit("productosActualizados", { productos: res.data })
      );
  });

  socket.on("nuevoMensaje", (data) => {
    fs.promises
      .readFile("./data/messages.txt", "utf-8")
      .then((respuestaDelArchivo) => {
        const mensajes = JSON.parse(respuestaDelArchivo);
        mensajes.push(data);
        fs.promises.writeFile("./data/messages.txt", JSON.stringify(mensajes));
      });

    io.sockets.emit("mensajeRecibo", data);
  });
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));
server.listen(PORT, () => console.log("server on!"));
