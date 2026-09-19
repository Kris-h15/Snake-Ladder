import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

export default function Board({
  board,
  ladders,
  snakes,
  getPlayersAtPosition,
}) {
  return (
    <div className="board-wrapper">
      <div className="board">
        {board.map((number) => {
          // playersHere will store postion of all players in an array
          const playersHere = getPlayersAtPosition(number);

          return (
            <div
              key={number}
              className={`cell ${number % 2 === 0 ? "even-cell" : "odd-cell"}`}
            >
              <span className="cell-number">{number}</span>

              {/* Ladders */}
              {ladders[number] && (
                <div className="ladder-icon">
                  <RocketLaunchIcon />
                  <small>{ladders[number]}</small>
                </div>
              )}

              {/* Snakes */}
              {snakes[number] && (
                <div className="snake-icon">
                  🐍
                  <small>{snakes[number]}</small>
                </div>
              )}

              {/* Players */}
              <div className="players-container">
                {playersHere.map((player) => (
                  <div
                    key={player.id}
                    className="player-token"
                    style={{
                      backgroundColor: player.color,
                    }}
                    title={player.name}
                  >
                    {player.id}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
