import "../styles/playscreen.css";

// Components
import Dice from "./dice";
import Player from "./player";
import Info from "./info";
import Header from "./header";
import Board from "./board";

// =================================
// data Here
// =================================
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

function createBoard() {
  const board = [];
  for (let row = 9; row >= 0; row--) {
    let numbers = [];
    for (let col = 10; col > 0; col--) {
      numbers.push(row * 10 + col);
    }
    if (row % 2 === 0) {
      numbers.reverse();
    }
    board.push(...numbers);
  }

  return board;
}

export default function Playscreen({ players, clickDice, roomcode }) {
  const board = createBoard();

  const getPlayersAtPosition = (position) => {
    return players.filter((player) => player.position === position);
  };

  return (
    <div className="game-container">
      {/* Header */}
      <Header />

      <div className="game-content">
        {/* Board */}
        <Board
          board={board}
          ladders={ladders}
          snakes={snakes}
          getPlayersAtPosition={getPlayersAtPosition}
        />

        {/* Side Panel/lower panel */}
        <div className="side-panel">
          {/* Dice */}
          <Dice clickDice={clickDice} roomcode={roomcode} />

          {/* Players */}
          <Player players={players} />

          {/* Game Rules */}
          <Info />
        </div>
      </div>
    </div>
  );
}
