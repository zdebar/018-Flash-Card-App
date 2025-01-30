import "./ChoiceBar.css";
import IconRepeat from './IconRepeat';
import IconKnown from "./IconKnown";

function ChoiceBar() {
  return (
    <div className="choiceBar">
      <button className="repeatButton">
        <IconRepeat />
      </button>
      <button className="dontButton">
        <IconKnown />
      </button>
    </div>
  );
}

export default ChoiceBar;
