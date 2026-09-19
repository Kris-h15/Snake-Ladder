import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

export default function Info() {
  return (
    <div className="rules-card">
      <h2>Game Info</h2>

      <div className="rule-item">
        <span>
          <RocketLaunchIcon />
        </span>
        <p>Ladder = Move Up</p>
      </div>

      <div className="rule-item">
        <span>🐍</span>
        <p>Snake = Move Down</p>
      </div>

      <div className="rule-item">
        <span>🏆</span>
        <p>Reach 100 to Win</p>
      </div>
    </div>
  );
}
