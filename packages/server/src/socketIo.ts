import { Server } from "socket.io";

function configureIoServer(io: Server) {
  io.on("connection", (socket) => {
    console.log(`Socket$${socket.id} connected.`);

    socket.on("disconnect", () => {
      console.log(`Socket$${socket.id} disconnected.`);
    });
  });
}

export { configureIoServer };
