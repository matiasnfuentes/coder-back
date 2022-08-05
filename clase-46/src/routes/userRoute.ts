import Router from "koa-router";
import { userController } from "../controller/usercontroller";
import * as KoaPassport from "koa-passport";
import { UserDTO } from "../persistencia/types";
import { checkAuthentication } from "../middlewares/checkAuthentication";
import multer from "@koa/multer";
import { userService } from "../services/userService";
import { ADMIN_EMAIL } from "../config/config";
import { transporter } from "../services/messageService";
import { logger } from "../services/logger";

const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: (ctx, file, cb) => {
    const { email } = ctx.body;
    const ext = file.originalname.split(".").pop();
    cb(null, email + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

export default (app, passport: typeof KoaPassport) => {
  const userRoute = new Router();

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
  userRoute.get("/info", getInfo);
  userRoute.get("/profile", checkAuthentication, getProfile);

  userRoute.get("/login", getLogin);
  userRoute.post("/login", async (ctx, next) => {
    return passport.authenticate("local", (err: string, user: UserDTO) => {
      if (!user) {
        ctx.redirect("/login-fail");
      } else {
        ctx.login(user);
        ctx.redirect("/");
      }
    })(ctx, next);
  });
  userRoute.get("/login-fail", loginFail);
  userRoute.get("/logout", logout);

  userRoute.get("/register", register);
  userRoute.get("/register-fail", registerFail);
  userRoute.get("/carrito", checkAuthentication, getCart);

  userRoute.post("/register", upload.single("avatar"), async (ctx, next) => {
    const { email, password, nyap, direccion, edad, avatar, telefono } =
      ctx.request.body;
    try {
      const user = await userService.createUser({
        email,
        password,
        nyap,
        direccion,
        edad,
        avatar: ctx.request.file.filename,
        telefono,
      });
      const mailOptions = {
        from: "E-commerce",
        to: ADMIN_EMAIL,
        subject: "Nuevo Registro",
        html: `<h1>Se ha generado un nuevo pedido:</h1>
           <p>Email: ${email}</p>
           <p>Nombre y apellido: ${nyap}</p>
           <p>Dirección: ${direccion}</p>
           <p>Edad: ${edad}</p>
           <p>Telefono: ${telefono}</p>`,
      };

      transporter.sendMail(mailOptions);
      return passport.authenticate("local", (err, user) => {
        console.log(user);
        if (user) {
          console.log("pase la prueba");
          ctx.login(user);
          ctx.redirect("/");
        } else {
          ctx.throw(500, "Falló la autenticación");
        }
      })(ctx, next);
    } catch (e) {
      ctx.redirect("/register-fail");
    }
  });

  app.use(userRoute.routes()).use(userRoute.allowedMethods());
};
