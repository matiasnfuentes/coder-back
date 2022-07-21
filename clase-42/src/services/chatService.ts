import { normalize, schema } from "normalizr";
import { MessageDTO } from "../persistencia/types";
import { DAOFactory, MESSAGE } from "../persistencia/DAOFactory";
import { MessageDAO } from "../persistencia/mongodb/mensajeDAO";

const mensajesDAO = DAOFactory.createDAO(MESSAGE) as MessageDAO;
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
  const mensajes: MessageDTO[] = await mensajesDAO.getAll();
  const originalData = { id: "mensajes", mensajes };
  return normalize(originalData, listOfMessages);
};

const saveMessage = async (message) => {
  await mensajesDAO.save({
    _id: message.timestamp + message.author.id,
    ...message,
  });
};

export const chatService = { getNormalizedMessages, saveMessage };
