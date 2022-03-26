const socket = io();

document.getElementById("texto").addEventListener("input", (e) => {
  socket.emit("typing", e.target.value);
  console.log(e.target.value);
});

document.getElementById("enviar").addEventListener("submit", (e) => {
  e.preventDefault();
  const texto = document.getElementById("texto");
  socket.emit("enviar", texto.value);
  texto.value = "";
});

const renderChatBlock = (data) => {
  const chatBlock = document.createElement("div");
  chatBlock.innerHTML = `
      <h2 ${data.socketId === socket.id && "style='color: blue'"}>${
    data.socketId
  } :</h2>
      <p id="${data.messageId}">${data.mensaje}</p>`;
  document.getElementById("chat").appendChild(chatBlock);
};

socket.on("connected", (data) => {
  data.forEach((m) => renderChatBlock(m));
});

socket.on("mensajeGlobal", (data) => {
  let currentMessage = document.getElementById(data.messageId);
  if (!currentMessage) {
    renderChatBlock(data);
  } else {
    currentMessage.innerHTML = data.mensaje;
  }
});
