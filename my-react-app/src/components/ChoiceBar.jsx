import "./ChoiceBar.css";
import IconRepeat from './Icons/IconRepeat';
import IconKnown from "./Icons/IconKnown";

export default function ChoiceBar() {
  return (
    <div className="choiceBar">
      <button className="repeatButton">
        <IconRepeat style={{ fill: "var(--text-color)"}}/>
      </button>
      <button className="knownButton">
        <IconKnown style={{ fill: "var(--text-color)"}}/>
      </button>
    </div>
  );
}