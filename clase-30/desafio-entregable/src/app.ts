import path from "path";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import { setUpPassport } from "./passportSetup";
import { staticRoute } from "./static/static";
import { MONGO_URL, SESSION_SECRET } from "./config";
import { api } from "./api/api";
import express from "express";
import * as handleBars from "express-handlebars";
import { checkAuthentication } from "./helpers";
import * as os from "os";

export const createApp = () => {
  const app = express();
  app.engine(
    "hbs",
    handleBars.engine({
      extname: ".hbs",
      layoutsDir: __dirname + "/../public/views",
    })
  );
  app.set("views", __dirname + "/../public/views");
  app.set("view engine", "hbs");

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

  app.use(passport.initialize());
  app.use(passport.session());

  setUpPassport(passport);

  // Routes

  app.use("/api", api);
  app.use("/static", staticRoute);

  // Root

  app.get("/", checkAuthentication, (req, res) => {
    res.sendFile(path.resolve("public/index.html"));
  });

  app.get("/info", (req, res) => {
    const { argv, execPath, platform, version, pid, memoryUsage, cwd } =
      process;
    console.log(`Info en ${process.pid} y ${process.argv}`);
    const { rss } = memoryUsage();
    res.render("info", {
      layout: "info",
      argv,
      execPath,
      platform,
      version,
      pid,
      rss,
      currentDir: cwd(),
      cpus: os.cpus().length,
    });
  });

  // LOGIN

  app.get("/login", (req, res) => {
    res.sendFile(path.resolve("public/login.html"));
  });

  app.post(
    "/login",
    passport.authenticate("login", { failureRedirect: "/login-fail" }),
    (req, res) => {
      res.redirect("/");
    }
  );

  app.get("/login-fail", (req, res) => {
    res.sendFile(path.resolve("public/login-fail.html"));
  });

  // REGISTRO

  app.get("/register", (req, res) => {
    res.sendFile(path.resolve("public/register.html"));
  });

  app.post(
    "/register",
    passport.authenticate("signup", { failureRedirect: "/register-fail" }),
    (req, res) => {
      res.redirect("/");
    }
  );

  app.get("/register-fail", (req, res) => {
    res.sendFile(path.resolve("public/register-fail.html"));
  });

  // Logout

  app.get("/logout", (req, res) => {
    req.logOut();
    res.redirect("/login");
  });

  app.get("/args", (req, res) => {
    res.send(process.argv);
  });
  return app;
};
