const fs = require("fs");
const axios = require("axios");

const sendInitialData = async (socket) => {
  const { data: productos } = await axios.get(
    "http://localhost:8080/api/productos"
  );
  const { data: template } = await axios.get(
    "http://localhost:8080/views/tabla.hbs"
  );
  const fileData = await fs.promises.readFile("./data/messages.txt", "utf-8");
  const mensajes = JSON.parse(fileData);
  socket.emit("connected", {
    mensajes,
    productos,
    template,
  });
};

const saveMessage = async (newMessage) => {
  const fileData = await fs.promises.readFile("./data/messages.txt", "utf-8");
  const currentMessages = JSON.parse(fileData);
  currentMessages.push(newMessage);
  fs.promises.writeFile("./data/messages.txt", JSON.stringify(currentMessages));
};

module.exports = { sendInitialData, saveMessage };
