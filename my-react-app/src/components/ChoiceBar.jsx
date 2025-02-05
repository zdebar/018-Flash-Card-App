import "./ChoiceBar.css";
import IconRepeat from './Icons/IconRepeat';
import IconKnown from "./Icons/IconKnown";

export default function ChoiceBar() {
  return (
    <div className="choiceBar">
      <button className="repeatButton">
        <IconRepeat />
      </button>
      <button className="knownButton">
        <IconKnown />
      </button>
    </div>
  );
}