import { HangmanRoom } from "@hangman/core";
import { Server } from "socket.io";

const defaultPhrase = "Lorem ipsum dolor sit";

const defaultRoom = new HangmanRoom(defaultPhrase);

function configureIoServer(io: Server) {
  io.of("/").adapter.on("create-room", (room) => {
    console.log(`room ${room} was created`);
  });

  io.of("/").adapter.on("join-room", (room, id) => {
    console.log(`socket ${id} has joined room ${room}`);
  });

  io.on("connection", (socket) => {
    console.log(`Socket$${socket.id} connected.`);

    socket.emit("room change", {
      charsGuessed: defaultRoom.charsGuessed,
      numErrors: defaultRoom.numErrors,
      phrase: defaultRoom.getMaskedPhrase(),
    });

    socket.on("disconnect", () => {
      console.log(`Socket$${socket.id} disconnected.`);
    });

    socket.on("char guess", (data: { char: string }) => {
      try {
        const charGuess = defaultRoom.guessChar(data.char);
        console.log(`Socket$z${socket.id} guessed char ${charGuess.char}.`);
      } catch (error: any) {
        console.log(`Socket$z${socket.id} retried to guess char ${data.char}.`);
      } finally {
        io.emit("room change", {
          charsGuessed: defaultRoom.charsGuessed,
          numErrors: defaultRoom.numErrors,
          phrase: defaultRoom.getMaskedPhrase(),
        });
      }
    });
  });
}

export { configureIoServer };
