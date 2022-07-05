import { logger } from "../services/logger";
import { chatService } from "../services/chatService";

const getMessages = async (req, res): Promise<void> => {
  try {
    res.send(await chatService.getNormalizedMessages());
  } catch (e) {
    logger.error(e);
    res.status(500).send("Error al obtener los mensajes");
  }
};

const saveMessage = async (req, res) => {
  const mensaje = req.body;
  try {
    await chatService.saveMessage(mensaje);
    res.send("guardado ok");
  } catch (e) {
    logger.error(e);
    res.status(500).send("Error al guardar los mensajes");
  }
};

export const chatController = { saveMessage, getMessages };
