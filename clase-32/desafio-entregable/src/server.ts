import { Server as IOServer } from "socket.io";
import { Server as HttpServer } from "http";
import parseArgs from "minimist";
import cluster from "cluster";
import * as os from "os";
import { createApp } from "./app";
import { setupIo } from "./config/ioSetup";

const { port: parameterPort, mode } = parseArgs(process.argv.slice(2));
const PORT = parameterPort || 8080;

// Server config
const createServer = (serverPort: number) => {
  const server = new HttpServer(createApp());
  const io: IOServer = new IOServer(server);
  setupIo(io);
  server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
    console.log(`Worker ${process.pid} started`);
  });
  server.on("error", (error) => console.log(`Error en servidor ${error}`));
};

if (mode === "CLUSTER" && cluster.isPrimary) {
  const numCPUs = os.cpus().length;

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  createServer(PORT);
}

process.on("uncaughtException", (err) => {
  console.log(err);
});
