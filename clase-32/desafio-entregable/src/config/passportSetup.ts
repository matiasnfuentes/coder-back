import { userService } from "../services/userService";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../modelo/types";
import { PassportStatic } from "passport";

export const setUpPassport = (passport: PassportStatic) => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user: User, done) => {
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
        try {
          const user = await userService.createUser({ email, password });
          return done(null, user);
        } catch (e) {
          console.log("User already exists");
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
        console.log(email);
        console.log(password);
        try {
          const user = await userService.verifyUser(email, password);
          return done(null, user);
        } catch (e) {
          console.log("Las credenciales son incorrectas");
          return done(null, false);
        }
      }
    )
  );
};
