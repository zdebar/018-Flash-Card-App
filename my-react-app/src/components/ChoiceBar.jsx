import "./ChoiceBar.css";
import RepeatIcon from './RepeatIcon';

function ChoiceBar() {
  return (
    <div className="choiceBar">
      <button className="repeatButton">
        <RepeatIcon />
      </button>
      <button className="dontButton">
      </button>
    </div>
  );
}

export default ChoiceBar;
