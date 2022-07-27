import axios from "axios";
import { Server as IOServer } from "socket.io";
import { logger } from "../services/logger";
import { DOMAIN } from "./config";

// Socket events
export const setupIo = (io: IOServer) => {
  io.on("connection", (socket) => {
    logger.info("¡Nuevo cliente conectado!");
    sendInitialData(socket);

    socket.on("nuevoMensaje", async (data) => {
      await axios.post(`http://${DOMAIN}/api/messages`, { ...data });
      const { data: mensajes } = await axios.get(
        `http://${DOMAIN}/api/messages`
      );
      io.sockets.emit("mensajeRecibo", mensajes);
    });
  });
};

const sendInitialData = async (socket) => {
  const { data: productos } = await axios.get(`http://${DOMAIN}/api/products/`);

  const { data: template } = await axios.get(
    `http://${DOMAIN}/views/tabla.hbs`
  );

  const { data: mensajes } = await axios.get(`http://${DOMAIN}/api/messages`);

  socket.emit("connected", {
    mensajes,
    productos,
    template,
  });
};
