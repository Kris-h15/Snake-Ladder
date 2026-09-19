import "../styles/WaitingRoom.css";

export default function WaitingRoom({
  players,
  roomCode,
  isHost,
  handleStartGame,
}) {
  return (
    <div className="waiting-page">
      <div className="waiting-card">
        {/* Header */}
        <div className="waiting-header">
          <div className="waiting-icon">🎲</div>

          <h1>Waiting Room</h1>

          <p>Waiting for players to join...</p>
        </div>

        {/* Room Code */}
        <div className="room-code-box">
          <div>
            <span className="room-label">ROOM CODE</span>

            <h2>{roomCode}</h2>
          </div>

          <button
            className="copy-button"
            onClick={() => {
              navigator.clipboard.writeText(roomCode);
            }}
          >
            📋 Copy
          </button>
        </div>

        {/* Players */}
        <div className="players-section">
          <div className="players-heading">
            <h3>Players</h3>

            <span>{players.length}/4</span>
          </div>

          <div className="players-list">
            {players.map((player, index) => (
              <div className="waiting-player" key={player.id}>
                <div
                  className="player-color"
                  style={{
                    backgroundColor: player.color,
                  }}
                >
                  {index + 1}
                </div>

                <div className="player-details">
                  <span className="player-name">{player.name}</span>

                  {index === 0 && <span className="host-badge">HOST</span>}
                </div>

                {index === 0 && <span className="crown">👑</span>}
              </div>
            ))}

            {/* Empty slots */}

            {Array.from({
              length: 4 - players.length,
            }).map((_, index) => (
              <div className="empty-player" key={`empty-${index}`}>
                <div className="empty-icon">+</div>

                <span>Waiting for player...</span>
              </div>
            ))}
          </div>
        </div>

        {/* Start Game */}

        <div className="start-section">
          {isHost ? (
            <button
              className="start-button"
              onClick={handleStartGame}
              disabled={players.length < 2}
            >
              🎮 Start Game
            </button>
          ) : (
            <div className="waiting-message">
              ⏳ Waiting for the host to start the game...
            </div>
          )}

          {isHost && players.length < 2 && (
            <p className="minimum-players">
              At least 2 players are required to start.
            </p>
          )}
        </div>

        {/* Footer */}

        <div className="game-rules">
          <span>👥 2–4 Players</span>

          <span>•</span>

          <span>🏆 First to 100 wins</span>
        </div>
      </div>
    </div>
  );
}
