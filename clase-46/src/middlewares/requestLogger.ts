import { NextFunction, Request, Response } from "express";
import Application from "koa";
import { logger } from "../services/logger";

// Loguea Ruta y método de todas las peticiones recibidas por el servidor (info)
export const requestLogger: Application.Middleware = async (ctx, next) => {
  logger.info(`Ruta: ${ctx.path} - Método: ${ctx.method}`);
  next();
};
