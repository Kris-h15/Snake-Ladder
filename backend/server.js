const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://snake-and-ladd.netlify.app/",
    methods: ["GET", "POST"],
  },
});

app.use(express.static(path.join(__dirname, "public")));

const port = process.env.PORT || 3000;

let rooms = {};

const snakes = {
  99: 54,
  95: 72,
  92: 51,
  89: 68,
  64: 36,
  62: 19,
  56: 53,
  49: 11,
  47: 26,
  16: 6,
};

const ladders = {
  2: 38,
  7: 14,
  8: 31,
  15: 26,
  21: 42,
  28: 84,
  36: 44,
  51: 67,
  71: 91,
  78: 98,
};
// -----------------------------------------------------------------

io.on("connection", (socket) => {
  console.log(`user connected : ${socket.id}`);

  // write everything here
  //create game
  socket.on("create game", (playerName) => {
    let ROOMCODE = "group";

    rooms[ROOMCODE] = { players: [], currentTurn: 0, gameStarted: false };

    const player = {
      id: socket.id,
      name: playerName,
      position: 1,
      color: "green",
      roomcode: ROOMCODE,
      ishost: true,
    };
    rooms[ROOMCODE].players.push(player);
    socket.join(ROOMCODE);
    socket.emit("game_created", ROOMCODE);
    // Send COMPLETE list to everyone
    io.to(ROOMCODE).emit("players_update", rooms[ROOMCODE].players);
  });
  // join game
  socket.on("join game", ({ playerName, roomCode }) => {
    socket.join(roomCode);
    const player = {
      id: socket.id,
      name: playerName,
      position: 1,
      color: "red",
      ishost: false,
    };

    // Add player to server's array
    rooms[roomCode].players.push(player);

    // Send COMPLETE list to everyone
    io.to(roomCode).emit("players_update", rooms[roomCode].players);
  });

  // start Game =================================
  socket.on("start_game", (x) => {
    const room = rooms[x];

    if (!room) return;

    room.gameStarted = true;
    room.currentTurn = 0;

    io.to(x).emit("start", x);
  });

  // Roll_dice=====================================
  socket.on("roll_dice", (roomcode) => {
    console.log("dice clicked");
    const room = rooms[roomcode];

    if (!room) return;

    const playerIndex = room.currentTurn;

    const player = room.players[playerIndex];

    if (player.id !== socket.id) return;

    const dice = Math.floor(Math.random() * 6) + 1;

    // update player.position
    let newPosition = player.position + dice;

    //chek for ladder at new postion
    if (ladders[newPosition]) {
      newPosition = ladders[newPosition];
    }

    // check for snake at new position
    if (snakes[newPosition]) {
      newPosition = snakes[newPosition];
    }

    if (newPosition <= 100) player.position = newPosition;
    else player.position = newPosition - dice;

    io.to(roomcode).emit("player_moved", {
      playerId: player.id,
      position: player.position,
      dice: dice,
    });
  });
});

// -----------------------------------------------------------------

server.listen(port, "0.0.0.0", () => {
  console.log(`Listening at port : ${port}`);
});
