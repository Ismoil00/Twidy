import express from "express";
import http from "http";
import { corsOptions } from "./configs/cors";
import { Server } from "socket.io";
import { socketConnection } from "./routes/authSocket";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: corsOptions,
  connectionStateRecovery: {
    maxDisconnectionDuration: 2 * 60 * 1000,
    skipMiddlewares: true,
  },
});

io.of("/socket/session").on("connection", socketConnection);

export { app, server, io };
