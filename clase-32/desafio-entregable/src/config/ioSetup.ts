import axios from "axios";
import { Server as IOServer } from "socket.io";

// Socket events
export const setupIo = (io: IOServer) => {
  io.on("connection", (socket) => {
    console.log("¡Nuevo cliente conectado!");
    sendInitialData(socket);

    socket.on("nuevoMensaje", async (data) => {
      await axios.post("http://localhost:8080/api/mensajes", { ...data });
      const { data: mensajes } = await axios.get(
        "http://localhost:8080/api/mensajes"
      );
      io.sockets.emit("mensajeRecibo", mensajes);
    });
  });
};

const sendInitialData = async (socket) => {
  const { data: productos } = await axios.get(
    "http://localhost:8080/api/productos-test"
  );

  const { data: template } = await axios.get(
    "http://localhost:8080/static/tabla.hbs"
  );

  const { data: mensajes } = await axios.get(
    "http://localhost:8080/api/mensajes"
  );

  socket.emit("connected", {
    mensajes,
    productos,
    template,
  });
};
