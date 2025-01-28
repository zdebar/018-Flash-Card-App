import './Card.css';
import ChoiceBar from './ChoiceBar';
import PropTypes from 'prop-types';


function CardSrc ({ src, trg, prn }) {
  return (
    <div className="card">      
      <p className="text__src">{src}</p>
      <p className="text__trg">{trg}</p>
      <p className="text__prn">[ {prn} ]</p>
      <ChoiceBar />
    </div>
  );
}

CardSrc.propTypes = {
  src: PropTypes.string.isRequired,        
  trg: PropTypes.string.isRequired, 
  prn: PropTypes.string.isRequired, 
};

export default CardSrc;