import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import { setUpPassport } from "./passportSetup";
import { MONGO_URL, SESSION_SECRET } from "./config";
import * as handleBars from "express-handlebars";
import { requestLogger } from "../middlewares/requestLogger";
import express from "express";
import passport from "passport";

export const setUpApp = (app: express.Application) => {
  // Set render engine
  app.engine(
    "hbs",
    handleBars.engine({
      extname: ".hbs",
      layoutsDir: __dirname + "/../public/views",
    })
  );
  app.set("views", __dirname + "/../public/views");
  app.set("view engine", "hbs");

  // Server configs
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(
    session({
      store: MongoStore.create({
        mongoUrl: MONGO_URL,
        ttl: 600,
      }),
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(requestLogger);

  // Initialize passport

  app.use(passport.initialize());
  app.use(passport.session());

  setUpPassport(passport);
};
