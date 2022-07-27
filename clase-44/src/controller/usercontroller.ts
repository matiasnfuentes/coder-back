import { DOMAIN } from "../config/config";
import { UserDTO } from "../persistencia/types";
import { carritoService } from "../services/cartService";
import { logger } from "../services/logger";
import * as os from "os";

const loginFail = (req, res) => {
  res.render("login-fail", { layout: "login-fail", domain: DOMAIN });
};

const register = (req, res) => {
  res.render("register", { layout: "register", domain: DOMAIN });
};

const registerFail = (req, res) => {
  res.render("register-fail", { layout: "register-fail", domain: DOMAIN });
};

const getLogin = (req, res) => {
  res.render("login", { layout: "login", domain: DOMAIN });
};

const successfulLogin = (req, res) => {
  res.redirect("/");
};

const logout = (req, res) => {
  req.logOut();
  res.redirect("/login");
};

const handleUnimplementedRoutes = (req, res) => {
  logger.warn(`Ruta: ${req.path} - Método: ${req.method}`);
  res.status(404).send({
    error: -2,
    descripcion: `ruta ${req.path} método ${req.method} no implementada`,
  });
};

const redirectToMainpage = (req, res) => {
  res.render("index", { layout: "index", domain: DOMAIN });
};

const getProfile = (req, res) => {
  const { email, nyap, direccion, edad, avatar, telefono } =
    req.user as UserDTO;
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
};

const getCart = async (req, res) => {
  const { email } = req.user as UserDTO;
  let carrito = await carritoService.getByOwnerEmail(email);
  if (!carrito) {
    carrito = await carritoService.createCart(email);
  }
  res.render("carrito", {
    layout: "carrito",
    productos: carrito.productos,
  });
};

const getInfo = (req, res) => {
  const { argv, execPath, platform, version, pid, memoryUsage, cwd } = process;
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
