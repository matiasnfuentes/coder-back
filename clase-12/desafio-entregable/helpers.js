const fs = require("fs");
const axios = require("axios");

const sendInitialData = async (socket) => {
  const { data } = await axios.get("http://localhost:8080/api/productos");
  const fileData = await fs.promises.readFile("./data/messages.txt", "utf-8");
  const currentMessages = JSON.parse(fileData);
  socket.emit("connected", {
    mensajes: currentMessages,
    productos: data,
  });
};

const saveMessage = async (newMessage) => {
  const fileData = await fs.promises.readFile("./data/messages.txt", "utf-8");
  const currentMessages = JSON.parse(fileData);
  currentMessages.push(newMessage);
  fs.promises.writeFile("./data/messages.txt", JSON.stringify(currentMessages));
};

module.exports = { sendInitialData, saveMessage };
