const http = require("http");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const cluster = require("cluster");
const os = require("os");
require('dotenv').config();

const app = require("./app");
const socketHandlers = require("./utils/socketHandler");

const numCPUs = os.cpus().length;
const PORT = process.env.PORT || 5000;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  const server = http.createServer(app);

  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    },
  });

  mongoose.connect(process.env.MONGO_URI);
  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
  });

  socketHandlers(io);

  server.listen(PORT, () => {
    console.log(`Worker ${process.pid} running on port ${PORT}`);
  });
}