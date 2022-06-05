import { Server as IOServer } from "socket.io";
import { Server as HttpServer } from "http";
import parseArgs from "minimist";
import cluster from "cluster";
import { fork } from "child_process";
import * as os from "os";
import { createApp } from "./app";
import { setupIo } from "./ioSetup";

const { port: parameterPort, mode, child } = parseArgs(process.argv.slice(2));
console.log(process.argv);
console.log(parseArgs(process.argv.slice(2)));
const PORT = parameterPort || 8080;

// Server config
const createServer = (serverPort: number) => {
  const server = new HttpServer(createApp());
  const io: IOServer = new IOServer(server);
  setupIo(io);
  server.listen(PORT, () => console.log(`Server listening on ${PORT}`));
  server.on("error", (error) => console.log(`Error en servidor ${error}`));
};

const numCPUs = os.cpus().length;

if (mode === "FORK") {
  if (child) {
    createServer(PORT);
  } else {
    for (let i = 0; i < numCPUs; i++) {
      const childPort = PORT ? PORT + i : 8080 + i;
      fork(__dirname + "/main.js", [
        "--port",
        childPort,
        "--mode",
        "FORK",
        "--child",
      ]);
    }
  }
}

if (mode === "CLUSTER") {
  if (cluster.isPrimary) {
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
  } else {
    createServer(PORT);
    console.log(`Worker ${process.pid} started`);
  }
}

if (mode == "EXTERNAL") createServer(PORT);
