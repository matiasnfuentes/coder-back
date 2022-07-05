import { NextFunction, Request, Response } from "express";
import { logger } from "../services/logger";

// Loguea Ruta y método de todas las peticiones recibidas por el servidor (info)
export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info(`Ruta: ${req.path} - Método: ${req.method}`);
  next();
};
