import { normalize, schema } from "normalizr";
import { Mensaje } from "../modelo/types";
import { MensajeDAO } from "../persistencia/mensajeDAO";

const mensajesDAO = new MensajeDAO();
const author = new schema.Entity("author");
const message = new schema.Entity(
  "mensaje",
  { author: author },
  { idAttribute: "_id" }
);
const listOfMessages = new schema.Entity("mensajes", {
  mensajes: [message],
});

const getNormalizedMessages = async () => {
  const mensajes: Mensaje[] = await mensajesDAO.obtenerTodos();
  const originalData = { id: "mensajes", mensajes };
  return normalize(originalData, listOfMessages);
};

const saveMessage = async (message) => {
  await mensajesDAO.guardar({
    id: message.timestamp + message.author.id,
    ...message,
  });
};

export const chatService = { getNormalizedMessages, saveMessage };
