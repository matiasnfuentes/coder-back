import axios from "axios";

export const sendInitialData = async (socket) => {
  const { data: productos } = await axios.get(
    "http://localhost:8080/api/productos-test"
  );
  const { data: template } = await axios.get(
    "http://localhost:8080/views/tabla.hbs"
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
