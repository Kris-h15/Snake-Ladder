import React, { useState } from "react";
import "../styles/lobby.css";

export default function Lobby({ handleCreateGame, handleJoinGame }) {
  const [playerName, setPlayerName] = useState("");
  const [roomCode, setRoomCode] = useState("group");

  return (
    <div className="lobby-page">
      <div className="lobby-card">
        {/* GAME LOGO / TITLE */}
        <div className="lobby-header">
          <div className="game-logo">🐍</div>

          <h1>Snake & Ladder</h1>

          <p>
            Roll the dice. Climb the ladders.
            <br />
            Avoid the snakes!
          </p>
        </div>

        {/* PLAYER NAME */}
        <div className="input-group">
          <label>Your Name</label>

          <input
            type="text"
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            maxLength={15}
          />
        </div>

        {/* CREATE GAME BUTTON*/}
        <button
          className="create-button"
          onClick={() => handleCreateGame(playerName)}
        >
          🎮 Create New Game
        </button>

        <div className="divider">
          <span>OR</span>
        </div>

        {/* ROOM CODE INPUT*/}
        <div className="input-group">
          {/*  */}
          <label>Your Name</label>

          <input
            type="text"
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            maxLength={15}
          />
          {/*  */}
          <label>Room Code</label>

          <input
            type="text"
            placeholder="Enter room code"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            maxLength={6}
          />
        </div>

        {/* JOIN GAME BUTTON*/}
        <button
          className="join-button"
          onClick={() => handleJoinGame(playerName, roomCode)}
        >
          🚀 Join Game
        </button>

        {/* GAME INFO */}
        <div className="lobby-info">
          <div className="info-item">
            <span>👥</span>
            <p>2–4 Players</p>
          </div>

          <div className="info-item">
            <span>🎲</span>
            <p>Real-time Game</p>
          </div>

          <div className="info-item">
            <span>🏆</span>
            <p>First to 100 Wins</p>
          </div>
        </div>
      </div>
    </div>
  );
}
