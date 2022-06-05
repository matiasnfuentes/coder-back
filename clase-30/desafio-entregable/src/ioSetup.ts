import axios from "axios";
import { sendInitialData } from "./helpers";
import { Server as IOServer } from "socket.io";

// Socket events
export const setupIo = (io: IOServer) => {
  io.on("connection", (socket) => {
    console.log("¡Nuevo cliente conectado!");
    sendInitialData(socket);

    socket.on("nuevoMensaje", async (data) => {
      await axios.post("http://localhost/api/mensajes", { ...data });
      const { data: mensajes } = await axios.get(
        "http://localhost/api/mensajes"
      );
      io.sockets.emit("mensajeRecibo", mensajes);
    });
  });
};
