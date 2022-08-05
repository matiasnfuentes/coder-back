import { UserDTO } from "../persistencia/types";
import strategy from "passport-local";
import { userService } from "../services/userService";
import { logger } from "../services/logger";
import bodyParser from "koa-bodyparser";

const LocalStrategy = strategy.Strategy;

export const setUpPassport = (passport) => {
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  /** Our strategies here: */
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        console.log("que tengo en email?");
        console.log(email);
        console.log("-------------------");
        try {
          console.log("estoy adentro de passport checkeando");
          const user = await userService.verifyUser(email, password);
          return done(null, user);
        } catch (e) {
          logger.warn("Las credenciales son incorrectas");
          return done(null, false);
        }
      }
    )
  );
  return passport;
};
