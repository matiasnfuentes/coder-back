import { userService } from "../services/userService";
import { Strategy as LocalStrategy } from "passport-local";
import { UserDTO } from "../persistencia/types";
import { PassportStatic } from "passport";
import { logger } from "../services/logger";
import { transporter } from "../services/messageService";
import { ADMIN_EMAIL } from "./config";

export const setUpPassport = (passport: PassportStatic) => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user: UserDTO, done) => {
    done(null, user);
  });

  passport.use(
    "signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        const { nyap, direccion, edad, avatar, telefono } = req.body;
        try {
          const user = await userService.createUser({
            email,
            password,
            nyap,
            direccion,
            edad,
            avatar: req.file!!.filename,
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

          return done(null, user);
        } catch (e) {
          logger.warn("User already exists");
          return done(null, false);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          const user = await userService.verifyUser(email, password);
          return done(null, user);
        } catch (e) {
          logger.warn("Las credenciales son incorrectas");
          return done(null, false);
        }
      }
    )
  );
};
