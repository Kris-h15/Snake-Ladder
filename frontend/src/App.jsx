import "./App.css";
import connectsocket from "./script";
import { useState, useEffect, useRef } from "react";

import Lobby from "./components/lobby";
import WaitingRoom from "./components/waitingRoom";
import Playscreen from "./components/playscreen";

function App() {
  const [players, setplayers] = useState([]);

  let [screen, setscreen] = useState("lobby");
  let socket = useRef(null);

  // will store the current user's name here
  const name = useRef(null);
  const roomcode = useRef(null);
  let [ishost, setishost] = useState();

  useEffect(() => {
    socket.current = connectsocket();

    socket.current.on("connect", () => {
      socket.current.on("game_created", (code) => {
        roomcode.current = code;
        setscreen("waiting");
      });

      // write everything here
      socket.current.on("players_update", (players) => {
        setplayers(players);
      });

      // start game
      socket.current.on("start", () => {
        setscreen("game");
      });

      // dice roll emit received to all
      socket.current.on("player_moved", ({ playerId, position, dice }) => {
        console.log("Player moved:", playerId, "to", position);

        setplayers((prevPlayers) => {
          return prevPlayers.map((player) => {
            if (player.id === playerId) {
              return {
                ...player,
                position: position,
              };
            }

            return player;
          });
        });
      });
    });
  }, []);

  // =====================================================
  // All functions here
  const handleCreateGame = (playerName) => {
    if (!playerName.trim()) {
      alert("Please enter your name");
      return;
    }

    name.current = playerName;
    setishost(true);

    socket.current.emit("create game", playerName);
  };

  const handleJoinGame = (playerName, roomCode) => {
    if (!roomCode.trim()) {
      alert("Please enter valid roomCode");
      return;
    } else {
      setishost(false);
      setscreen("waiting");
      socket.current.emit("join game", { playerName, roomCode });
    }
  };

  const handleStartGame = () => {
    socket.current.emit("start_game", roomcode.current);
    console.log("start clicked");
  };

  // function for diceClicking
  const clickDice = (roomcode) => {
    socket.current.emit("roll_dice", roomcode.current);
  };
  //
  // =====================================================

  return (
    <>
      {screen === "lobby" ? (
        <Lobby
          handleCreateGame={handleCreateGame}
          handleJoinGame={handleJoinGame}
        />
      ) : screen === "waiting" ? (
        <WaitingRoom
          players={players}
          roomCode={roomcode.current}
          isHost={ishost}
          handleStartGame={handleStartGame}
        />
      ) : (
        <Playscreen
          players={players}
          clickDice={clickDice}
          roomcode={roomcode}
        />
      )}
    </>
  );
}

export default App;
