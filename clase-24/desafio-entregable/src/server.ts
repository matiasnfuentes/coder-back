import { api } from "./api/api";
import { sendInitialData } from "./helpers";
import axios from "axios";
import express from "express";
import { Server as IOServer } from "socket.io";
import { Server as HttpServer } from "http";
import path from "path";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";

// Server config
const app = express();
const server = new HttpServer(app);
const io = new IOServer(server);
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://coderback:coderback@cluster0.6ofyr.mongodb.net/Cluster0?retryWrites=true&w=majority",
      ttl: 10,
    }),
    secret: "imADummySecret",
    resave: false,
    saveUninitialized: false,
  })
);

// Routes

app.use("/api", api);

app.get("/", (req, res) => {
  if (req.session["nombre"])
    return res.sendFile(path.resolve("public/index.html"));
  res.sendFile(path.resolve("public/login.html"));
});

app.post("/login", (req, res) => {
  const { nombre } = req.body;
  if (nombre !== "") {
    req.session["nombre"] = nombre;
    res.sendFile(path.resolve("public/index.html"));
  } else {
    res.sendFile(path.resolve("public/login.html"));
  }
});

// Rutas de archivos estáticos, esto no interesa
app.get("/static/login.js", (req, res) => {
  res.sendFile(path.resolve("public/login.js"));
});
app.get("/static/index.js", (req, res) => {
  res.sendFile(path.resolve("public/index.js"));
});
app.get("/static/tabla.hbs", (req, res) => {
  res.sendFile(path.resolve("public/views/tabla.hbs"));
});

// Socket events

io.on("connection", (socket) => {
  console.log("¡Nuevo cliente conectado!");
  sendInitialData(socket);

  socket.on("nuevoMensaje", async (data) => {
    await axios.post("http://localhost:8080/api/mensajes", { ...data });
    const { data: mensajes } = await axios.get(
      "http://localhost:8080/api/mensajes"
    );
    io.sockets.emit("mensajeRecibo", mensajes);
  });
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));
server.listen(PORT, () => console.log("server on!"));
