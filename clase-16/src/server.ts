import { api } from "./api/api";
import { sendInitialData } from "./helpers";
import axios from "axios";
import express from "express";
import { Server as IOServer } from "socket.io";
import { Server as HttpServer } from "http";

// Server config
const app = express();
const server = new HttpServer(app);
const io = new IOServer(server);
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", api);
app.use(express.static(__dirname + "/../public"));

// Socket events

io.on("connection", (socket) => {
  console.log("¡Nuevo cliente conectado!");

  // Envio los datos inciales
  sendInitialData(socket);

  // Manipulación de productos

  socket.on("agregarProducto", async (data) => {
    const { title, price, thumbnail } = data;
    const { data: productos } = await axios.post(
      "http://localhost:8080/api/productos",
      {
        title,
        price,
        thumbnail,
      }
    );

    io.sockets.emit("productosActualizados", { productos });
  });

  socket.on("nuevoMensaje", (data) => {
    axios.post("http://localhost:8080/api/mensajes", { ...data });
    io.sockets.emit("mensajeRecibo", data);
  });
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));
server.listen(PORT, () => console.log("server on!"));
