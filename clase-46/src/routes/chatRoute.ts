import Router from "koa-router";
import { chatController } from "../controller/chatController";

const { getMessages, saveMessage } = chatController;

export default (app) => {
  const chatRoute = new Router({
    prefix: "/api/messages",
  });

  chatRoute.get("/", getMessages);
  chatRoute.post("/", saveMessage);
  app.use(chatRoute.routes()).use(chatRoute.allowedMethods());
};
