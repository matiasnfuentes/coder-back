import { logger } from "../services/logger";
import { chatService } from "../services/chatService";

const getMessages = async (ctx): Promise<void> => {
  try {
    ctx.body = await chatService.getNormalizedMessages();
  } catch (e) {
    logger.error(e);
    ctx.throw(500, "Error al obtener los mensajes");
  }
};

const saveMessage = async (ctx) => {
  const mensaje = ctx.request.body;
  try {
    await chatService.saveMessage(mensaje);
    ctx.body = "guardado ok";
  } catch (e) {
    logger.error(e);
    ctx.throw(500, "Error al guardar los mensajes");
  }
};

export const chatController = { saveMessage, getMessages };
