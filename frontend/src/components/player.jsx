export default function Player({ players }) {
  return (
    <div className="players-card">
      <h2>Players</h2>

      {players.map((player) => (
        <div className="player-row" key={player.id}>
          <div
            className="player-color"
            style={{
              backgroundColor: player.color,
            }}
          >
            {player.id}
          </div>

          <div className="player-details">
            <strong>{player.name}</strong>
            <span>Position: {player.position}</span>
          </div>

          {player.id === 1 && <span className="active-player">●</span>}
        </div>
      ))}
    </div>
  );
}
