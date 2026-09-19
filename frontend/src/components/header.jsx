export default function Header() {
  return (
    <div className="game-header">
      <div>
        <h1>🐍 Snake & Ladder</h1>
        <p>Race to 100!</p>
      </div>

      <div className="turn-indicator">
        <span className="turn-dot"></span>
        Player 1's Turn
      </div>
    </div>
  );
}
