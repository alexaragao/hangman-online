import http from "http";
import { Server } from "socket.io";

import { app } from "./src/app";
import { corsOptions } from "./src/middlewares/cors.middleware";
import { configureIoServer } from "./src/socketIo";

const server = http.createServer(app);

const io = new Server(server, { cors: corsOptions });

configureIoServer(io);

app.set("socketio", io);

server.listen(process.env.PORT ?? 5000);
