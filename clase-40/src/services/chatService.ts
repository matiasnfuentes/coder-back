import { normalize, schema } from "normalizr";
import { MensajeDTO } from "../persistencia/types";
import { CARRITO, DAOFactory } from "../persistencia/DAOFactory";
import { MensajeDAO } from "../persistencia/mongodb/mensajeDAO";

const mensajesDAO = DAOFactory.createDAO(CARRITO) as MensajeDAO;
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
  const mensajes: MensajeDTO[] = await mensajesDAO.getAll();
  const originalData = { id: "mensajes", mensajes };
  return normalize(originalData, listOfMessages);
};

const saveMessage = async (message) => {
  await mensajesDAO.save({
    id: message.timestamp + message.author.id,
    ...message,
  });
};

export const chatService = { getNormalizedMessages, saveMessage };
