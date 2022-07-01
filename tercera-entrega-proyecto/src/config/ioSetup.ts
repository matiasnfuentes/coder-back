import axios from "axios";
import { Server as IOServer } from "socket.io";
import { logger } from "../logger";
import { DOMAIN } from "./config";

// Socket events
export const setupIo = (io: IOServer) => {
  io.on("connection", (socket) => {
    logger.info("¡Nuevo cliente conectado!");
    sendInitialData(socket);

    socket.on("nuevoMensaje", async (data) => {
      await axios.post(`http://${DOMAIN}/api/mensajes`, { ...data });
      const { data: mensajes } = await axios.get(
        `http://${DOMAIN}/api/mensajes`
      );
      io.sockets.emit("mensajeRecibo", mensajes);
    });
  });
};

const sendInitialData = async (socket) => {
  const { data: productos } = await axios.get(
    `http://${DOMAIN}/api/productos-test`
  );

  const { data: template } = await axios.get(
    `http://${DOMAIN}/views/tabla.hbs`
  );

  const { data: mensajes } = await axios.get(`http://${DOMAIN}/api/mensajes`);

  socket.emit("connected", {
    mensajes,
    productos,
    template,
  });
};
