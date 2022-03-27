const socket = io();
let mailUsuario = "";

document.getElementById("formulario").onsubmit = (e) => {
  e.preventDefault();
  const title = e.target[0].value;
  const price = e.target[1].value;
  const thumbnail = e.target[2].value;
  e.target[0].value = "";
  e.target[1].value = "";
  e.target[2].value = "";
  socket.emit("agregarProducto", { title, price, thumbnail });
};

document.getElementById("emailUsuario").onchange = (e) => {
  const btnEnviar = document.getElementById("btn-enviar");
  if (e.target.value !== "") {
    btnEnviar.disabled = false;
    mailUsuario = e.target.value;
  } else {
    btnEnviar.disabled = true;
  }
};

document.getElementById("formulario-mensaje").onsubmit = (e) => {
  e.preventDefault();
  const inputField = document.getElementById("mensaje-texto");
  const mensaje = inputField.value;
  const tiempo = new Date();
  socket.emit("nuevoMensaje", {
    mail: mailUsuario,
    mensaje,
    tiempo: tiempo.toLocaleString(),
  });
  inputField.value = "";
};

// Sockets operations

let tablaTemplate;

const actualizarTabla = (productos, template) => {
  const html = template({ productos });
  document.getElementById("tabla").innerHTML = html;
};
//
const renderChatBlock = (data) => {
  const chatBlock = document.createElement("div");
  chatBlock.innerHTML = `
      <p><strong style='color: blue'>${data.mail}</strong> <span style='color: brown'>${data.tiempo}</span>: <span>${data.mensaje}</span></p>`;
  document.getElementById("mensajes").appendChild(chatBlock);
};

socket.on("connected", ({ productos, mensajes, template }) => {
  tablaTemplate = Handlebars.compile(template);
  actualizarTabla(productos, tablaTemplate);
  mensajes.forEach((m) => renderChatBlock(m));
});

socket.on("productosActualizados", ({ productos }) => {
  actualizarTabla(productos, tablaTemplate);
});

socket.on("mensajeRecibo", (data) => {
  renderChatBlock(data);
  const mensajes = document.getElementById("mensajes");
  mensajes.scrollTop = mensajes.scrollHeight;
});
