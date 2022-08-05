import { setUpPassport } from "./passportSetup";
import serve from "koa-static";
import mount from "koa-mount";
import render from "koa-ejs";
import path from "path";
import userRoute from "../routes/userRoute";
import { MONGO_URL, SESSION_SECRET } from "./config";
import bodyParser from "koa-bodyparser";
import passport from "koa-passport";
import co from "co";
import productsRoute from "../routes/productsRoute";
import chatRoute from "../routes/chatRoute";
import cartRoute from "../routes/cartRoute";
import adminRoute from "../routes/adminRoute";

export const setUpApp = (app) => {
  render(app, {
    root: path.join(__dirname, "/../public/views"),
    layout: false,
    viewExt: "ejs",
    async: true,
  });
  app.context.render = co.wrap(app.context.render);

  app.use(mount("/public", serve("./public")));
  const session = require("koa-session");
  app.keys = [SESSION_SECRET];
  app.use(session({}, app));

  // body parser
  app.use(bodyParser());

  // authentication
  setUpPassport(passport);
  app.use(passport.initialize());
  app.use(passport.session());
  //const passport = setUpPassport(app);

  userRoute(app, passport);
  productsRoute(app);
  chatRoute(app);
  cartRoute(app);
  adminRoute(app);
};
