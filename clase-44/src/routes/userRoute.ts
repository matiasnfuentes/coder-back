import { Router } from "express";
import { userController } from "../controller/usercontroller";
import { checkAuthentication } from "../middlewares/checkAuthentication";
import compression from "compression";
import passport from "passport";
import multer from "multer";

export const userRoute = Router();

const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: (req, file, cb) => {
    const { email } = req.body;
    const ext = file.originalname.split(".").pop();
    cb(null, email + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

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

userRoute.get("/", checkAuthentication, redirectToMainpage);

userRoute.get("/profile", checkAuthentication, getProfile);

userRoute.get("/carrito", checkAuthentication, getCart);

userRoute.get("/info", compression(), getInfo);

userRoute.get("/login", getLogin);

userRoute.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/login-fail" }),
  successfulLogin
);

userRoute.get("/login-fail", loginFail);

userRoute.get("/register", register);

userRoute.post(
  "/register",
  upload.single("avatar"),
  passport.authenticate("signup", { failureRedirect: "/register-fail" }),
  (req, res) => {
    res.redirect("/");
  }
);

userRoute.get("/register-fail", registerFail);

userRoute.get("/logout", logout);
