import path from "path";
import { productsRoute } from "./routes/productsRoute";
import express from "express";
import { cartRoute } from "./routes/cartRoute";
import { chatRoute } from "./routes/chatRoute";
import { setUpApp } from "./config/appSetup";
import { userRoute } from "./routes/userRoute";
import { adminRoute } from "./routes/adminRoute";
import { userController } from "./controller/usercontroller";

export const createApp = () => {
  const app = express();

  setUpApp(app);

  // Routes

  app.use(express.static(path.join(__dirname, "/../public/")));
  app.use("/api/cart", cartRoute);
  app.use("/api/messages", chatRoute);
  app.use("/api/products/", productsRoute);
  app.use("/", userRoute);
  app.use("/admin/", adminRoute);

  app.use(userController.handleUnimplementedRoutes);

  return app;
};
