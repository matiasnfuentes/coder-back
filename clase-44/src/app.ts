import path from "path";
import { productsRoute } from "./routes/productsRoute";
import express from "express";
import { cartRoute } from "./routes/cartRoute";
import { chatRoute } from "./routes/chatRoute";
import { setUpApp } from "./config/appSetup";
import { userRoute } from "./routes/userRoute";
import { adminRoute } from "./routes/adminRoute";
import { userController } from "./controller/usercontroller";
// GraphQL Dependencies
import { graphqlHTTP } from "express-graphql";
import { schema } from "./graphQL/schema";
import { productsController } from "./graphQL/prodductsController";

export const createApp = () => {
  const app = express();

  setUpApp(app);

  // GraphQL
  const { getAll, addProduct, deleteProduct, updateProduct } =
    productsController;
  app.use(
    "/graphql",
    graphqlHTTP({
      schema: schema,
      rootValue: { getAll, addProduct, deleteProduct, updateProduct },
      graphiql: true,
    })
  );

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
