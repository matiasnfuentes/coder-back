const { api } = require("./api/api");
const { sendInitialData, saveMessage } = require("./helpers");
const axios = require("axios");
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

// Routes
app.use("/api/productos", api);
app.use(express.static(__dirname + "/public"));

// Socket events

io.on("connection", (socket) => {
  console.log("¡Nuevo cliente conectado!");

  // Envio los datos inciales
  sendInitialData(socket);

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
    saveMessage(data);
    io.sockets.emit("mensajeRecibo", data);
  });
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));
server.listen(PORT, () => console.log("server on!"));
