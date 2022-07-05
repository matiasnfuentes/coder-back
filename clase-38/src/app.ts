import path from "path";
import passport from "passport";
import { productsRoute } from "./routes/productsRoute";
import express from "express";
import compression from "compression";
import { checkAuthentication } from "./middlewares/checkAuthentication";
import { cartRoute } from "./routes/cartRoute";
import { chatRoute } from "./routes/chatRoute";
import { userController } from "./controller/usercontroller";
import { setUpApp } from "./config/appSetup";
import multer from "multer";

export const createApp = () => {
  const app = express();
  const storage = multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => {
      const { email } = req.body;
      const ext = file.originalname.split(".").pop();
      cb(null, email + "-" + file.originalname);
    },
  });
  const upload = multer({ storage: storage });

  setUpApp(app);

  // Routes

  app.use(express.static(path.join(__dirname, "/../public/")));
  app.use("/api/cart", cartRoute);
  app.use("/api/messages", chatRoute);
  app.use("/api/products", productsRoute);

  // Root

  const {
    loginFail,
    register,
    registerFail,
    getLogin,
    successfulLogin,
    logout,
    handleUnimplementedRoutes,
    redirectToMainpage,
    getProfile,
    getCart,
    getInfo,
  } = userController;

  app.get("/", checkAuthentication, redirectToMainpage);

  app.get("/profile", checkAuthentication, getProfile);

  app.get("/carrito", checkAuthentication, getCart);

  app.get("/info", compression(), getInfo);

  app.get("/login", getLogin);

  app.post(
    "/login",
    passport.authenticate("login", { failureRedirect: "/login-fail" }),
    successfulLogin
  );

  app.get("/login-fail", loginFail);

  app.get("/register", register);

  app.post(
    "/register",
    upload.single("avatar"),
    passport.authenticate("signup", { failureRedirect: "/register-fail" }),
    (req, res) => {
      res.redirect("/");
    }
  );

  app.get("/register-fail", registerFail);

  app.get("/logout", logout);

  app.use(handleUnimplementedRoutes);
  return app;
};
