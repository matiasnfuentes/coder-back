const socket = io();

const checkValues = () => {
  const email = document.getElementById("email").value;
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const edad = document.getElementById("edad").value;
  const alias = document.getElementById("alias").value;
  const avatar = document.getElementById("avatar").value;
  return (
    email !== "" &&
    nombre !== "" &&
    apellido !== "" &&
    edad !== "" &&
    alias !== "" &&
    avatar !== ""
  );
};

const enableIfAllFieldsAreFilled = (htmlId) => {
  document.getElementById(htmlId).onchange = (e) => {
    const btnEnviar = document.getElementById("btn-enviar");
    if (checkValues()) {
      btnEnviar.disabled = false;
    } else {
      btnEnviar.disabled = true;
    }
  };
};

["email", "nombre", "apellido", "edad", "alias", "avatar"].forEach((id) =>
  enableIfAllFieldsAreFilled(id)
);

document.getElementById("formulario-mensaje").onsubmit = (e) => {
  e.preventDefault();
  const inputField = document.getElementById("mensaje-texto");
  const mensaje = inputField.value;
  const tiempo = new Date();
  const email = document.getElementById("email").value;
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const edad = document.getElementById("edad").value;
  const alias = document.getElementById("alias").value;
  const avatar = document.getElementById("avatar").value;
  socket.emit("nuevoMensaje", {
    author: {
      id: email,
      nombre: nombre,
      apellido: apellido,
      edad: edad,
      alias: alias,
      avatar: avatar,
    },
    text: mensaje,
    timestamp: tiempo.toLocaleString(),
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
      <p><strong style='color: blue'>${data.author.id}</strong> <span style='color: brown'>${data.timestamp}</span>: <span>${data.text}</span></p>`;
  document.getElementById("mensajes").appendChild(chatBlock);
};

const author = new normalizr.schema.Entity("author");
const message = new normalizr.schema.Entity("mensaje", { author: author });
const listOfMessages = new normalizr.schema.Entity("mensajes", {
  mensajes: [message],
});

const actualizarPorcentaje = (normalizado, denormalizado) => {
  const sizeNoramlizados = JSON.stringify(normalizado).length;
  const sizeDenoramlizados = JSON.stringify(denormalizado).length;
  const porcentaje = Math.round((sizeNoramlizados / sizeDenoramlizados) * 100);

  document.getElementById("porcentaje").innerHTML = `${porcentaje} %`;
};

const renderChats = (mensajes) => {
  const mensajesDesnormalizados = normalizr.denormalize(
    mensajes.result,
    listOfMessages,
    mensajes.entities
  );
  const mensajesDiv = document.getElementById("mensajes");
  mensajesDiv.innerHTML = "";
  actualizarPorcentaje(mensajes, mensajesDesnormalizados);

  mensajesDesnormalizados.mensajes.forEach((m) => renderChatBlock(m));
  mensajesDiv.scrollTop = mensajesDiv.scrollHeight;
};
socket.on("connected", ({ productos, mensajes, template }) => {
  tablaTemplate = Handlebars.compile(template);
  actualizarTabla(productos, tablaTemplate);
  renderChats(mensajes);
});

socket.on("mensajeRecibo", (data) => {
  renderChats(data);
});

// Product counter

function increaseCount(a, b, max) {
  var input = b.previousElementSibling;
  var value = parseInt(input.value, 10);
  value = isNaN(value) ? 0 : value;
  if (value < max) {
    value++;
    input.value = value;
  }
}
function decreaseCount(a, b) {
  var input = b.nextElementSibling;
  var value = parseInt(input.value, 10);
  if (value > 1) {
    value = isNaN(value) ? 0 : value;
    value--;
    input.value = value;
  }
}

function agregarProducto(id, name, price, description, code, thumbnail) {
  const cantidad = document.getElementById(`${id}-count`).value;
  fetch(`/api/cart/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      const { _id } = data;
      return fetch(`/api/cart/${_id}/productos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: id,
          name,
          price,
          cantidad,
          description,
          code,
          thumbnail,
        }),
      });
    })
    .then((res) => {
      window.location.replace(res.url);
    });
}
