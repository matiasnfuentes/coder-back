import path from "path";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import { setUpPassport } from "./config/passportSetup";
import { DOMAIN, MONGO_URL, SESSION_SECRET } from "./config/config";
import { api } from "./rutas/api/api";
import express from "express";
import * as handleBars from "express-handlebars";
import * as os from "os";
import compression from "compression";
import { requestLogger } from "./middlewares/requestLogger";
import { logger } from "./logger";
import { checkAuthentication } from "./middlewares/checkAuthentication";
import multer from "multer";
import { User } from "./modelo/types";
import { CarritoService } from "./services/carritoService";

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
  app.use(express.static(path.join(__dirname, "/../public/")));

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

  // Routes

  app.use("/api", api);

  // Root
  app.get("/", checkAuthentication, (req, res) => {
    res.render("index", { layout: "index", domain: DOMAIN });
  });

  app.get("/profile", checkAuthentication, (req, res) => {
    const { email, nyap, direccion, edad, avatar, telefono } = req.user as User;
    res.render("profile", {
      layout: "profile",
      domain: DOMAIN,
      email,
      edad,
      nyap,
      avatar,
      telefono,
      direccion,
    });
  });

  app.get("/carrito", checkAuthentication, async (req, res) => {
    const { email, nyap, direccion, edad, avatar, telefono } = req.user as User;
    let carrito = await CarritoService.getByOwnerEmail(email);
    if (!carrito) {
      carrito = await CarritoService.crearCarrito(email);
    }
    res.render("carrito", {
      layout: "carrito",
      productos: carrito.productos,
    });
  });

  app.get("/info", compression(), (req, res) => {
    const { argv, execPath, platform, version, pid, memoryUsage, cwd } =
      process;
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
    res.render("login", { layout: "login", domain: DOMAIN });
  });

  app.post(
    "/login",
    passport.authenticate("login", { failureRedirect: "/login-fail" }),
    (req, res) => {
      res.redirect("/");
    }
  );

  app.get("/login-fail", (req, res) => {
    res.render("login-fail", { layout: "login-fail", domain: DOMAIN });
  });

  // REGISTRO

  app.get("/register", (req, res) => {
    res.render("register", { layout: "register", domain: DOMAIN });
  });

  app.post(
    "/register",
    upload.single("avatar"),
    passport.authenticate("signup", { failureRedirect: "/register-fail" }),
    (req, res) => {
      res.redirect("/");
    }
  );

  app.get("/register-fail", (req, res) => {
    res.render("register-fail", { layout: "register-fail", domain: DOMAIN });
  });

  // Logout

  app.get("/logout", (req, res) => {
    req.logOut();
    res.redirect("/login");
  });

  app.get("/args", (req, res) => {
    res.send(process.argv);
  });

  app.use((req, res) => {
    logger.warn(`Ruta: ${req.path} - Método: ${req.method}`);
    res.status(404).send({
      error: -2,
      descripcion: `ruta ${req.path} método ${req.method} no implementada`,
    });
  });
  return app;
};
