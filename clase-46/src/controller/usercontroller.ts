import { DOMAIN } from "../config/config";
import { UserDTO } from "../persistencia/types";
import { carritoService } from "../services/cartService";
import { logger } from "../services/logger";
import * as os from "os";

const loginFail = async (ctx) => {
  await ctx.render("login-fail", { domain: DOMAIN });
};

const register = async (ctx) => {
  await ctx.render("register", { domain: DOMAIN });
};

const registerFail = async (ctx) => {
  await ctx.render("register-fail", {
    layout: "register-fail",
    domain: DOMAIN,
  });
};

const getLogin = async (ctx: any) => {
  return ctx.render("login", { domain: DOMAIN });
};

const successfulLogin = (ctx) => {
  ctx.redirect("/");
};

const logout = (ctx) => {
  ctx.logout();
  ctx.redirect("/login");
};

const handleUnimplementedRoutes = (ctx) => {
  logger.warn(`Ruta: ${ctx.path} - Método: ${ctx.method}`);
  ctx.status(404).send({
    error: -2,
    descripcion: `ruta ${ctx.path} método ${ctx.method} no implementada`,
  });
};

const redirectToMainpage = async (ctx: any) => {
  await ctx.render("index", { domain: DOMAIN });
};

const getProfile = async (ctx) => {
  const { email, nyap, direccion, edad, avatar, telefono } = ctx.state.user;
  await ctx.render("profile", {
    domain: DOMAIN,
    email,
    edad,
    nyap,
    avatar,
    telefono,
    direccion,
  });
};

const getCart = async (ctx) => {
  const { email } = ctx.state.user as UserDTO;
  let carrito = await carritoService.getByOwnerEmail(email);
  if (!carrito) {
    carrito = await carritoService.createCart(email);
  }

  await ctx.render("carrito", {
    productos: carrito.productos,
    domain: DOMAIN,
  });
};

const getInfo = async (ctx) => {
  const { argv, execPath, platform, version, pid, memoryUsage, cwd } = process;
  const { rss } = memoryUsage();
  await ctx.render("info", {
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
};

export const userController = {
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
};
