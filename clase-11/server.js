// Express config
const express = require("express");
const app = express();
const { Server: IOServer } = require("socket.io");
const { Server: HttpServer } = require("http");

// Server config
const server = new HttpServer(app);
const io = new IOServer(server);

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.get("/", (req, res) => {
  res.sendFile("index.hml", { root: __dirname });
});

let mensajes = [];

const messageFromData = (socketId, messageNumber, message) => ({
  socketId: socketId,
  messageId: socketId + messageNumber,
  mensaje: message,
});

io.on("connection", (socket) => {
  console.log("¡Nuevo cliente conectado!");
  socket.emit("connected", mensajes);

  let mensaje;
  let id = 0;

  socket.on("typing", (data) => {
    mensaje = data;
    io.sockets.emit("mensajeGlobal", messageFromData(socket.id, id, data));
  });

  socket.on("enviar", (data) => {
    mensajes.push(messageFromData(socket.id, id, data));
    id++;
  });
});

server.listen(PORT, () => console.log("server on!"));
