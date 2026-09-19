export default function Dice({ clickDice, roomcode }) {
  return (
    <div className="dice-card">
      <h2>Your Turn</h2>

      <div className="dice">🎲</div>

      <button className="roll-button" onClick={() => clickDice(roomcode)}>
        Roll Dice
      </button>

      <p className="dice-info">Roll the dice to move your token</p>
    </div>
  );
}
