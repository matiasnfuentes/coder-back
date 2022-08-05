import koa from "koa";
import { setUpApp } from "./config/appSetup";

export const createApp = () => {
  const app = new koa();
  setUpApp(app);
  return app;
};
