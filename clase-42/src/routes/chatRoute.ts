import { Router } from "express";
import { chatController } from "../controller/chatController";

export const chatRoute = Router();
const { getMessages, saveMessage } = chatController;

chatRoute.get("/", getMessages);
chatRoute.post("/", saveMessage);
