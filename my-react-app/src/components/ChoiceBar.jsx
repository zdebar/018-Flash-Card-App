import "./ChoiceBar.css";
import IconRepeat from './Icons/IconRepeat';
import IconKnown from "./Icons/IconKnown";

export default function ChoiceBar() {
  return (
    <div className="choiceBar grid">
      <button className="repeatButton flex-center border">
        <IconRepeat style={{ fill: "var(--text-color)"}}/>
      </button>
      <button className="knownButton flex-center border">
        <IconKnown style={{ fill: "var(--text-color)"}}/>
      </button>
    </div>
  );
}