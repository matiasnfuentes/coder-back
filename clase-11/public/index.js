const socket = io();

document.getElementById("texto").addEventListener("input", (e) => {
  socket.emit("typing", e.target.value);
  console.log(e.target.value);
});

document.getElementById("enviar").addEventListener("click", (e) => {
  e.preventDefault();
  const texto = document.getElementById("texto");
  socket.emit("enviar", texto.value);
  texto.value = "";
});

socket.on("connected", (data) => {
  const chat = document.getElementById("chat");
  data.forEach((m) => {
    const chatBlock = document.createElement("div");
    chatBlock.innerHTML = `
        <h2>${m.socketId} :</h2>
        <p id="${m.messageId}">${m.mensaje}</p>`;
    document.getElementById("chat").appendChild(chatBlock);
  });
});

socket.on("mensajeGlobal", (data) => {
  let currentMessage = document.getElementById(data.messageId);
  if (!currentMessage) {
    const chatBlock = document.createElement("div");
    chatBlock.innerHTML = `
        <h2>${data.socketId} :</h2>
        <p id="${data.messageId}">${data.mensaje}</p>`;
    document.getElementById("chat").appendChild(chatBlock);
  } else {
    currentMessage.innerHTML = data.mensaje;
  }
});
