import './Card.css';
import ChoiceBar from './ChoiceBar';
import RevealButton from './RevealButton';
import PropTypes from 'prop-types';

export default function Card ({ src, trg, prn }) {
  const showRevealButton = true;

  return (
    <div className="card flex-column justify-between">      
      <div className='note flex-column justify-between align-center border'>
        <p className="text__src flex-column justify-center">{src}</p>
        <p className="text__trg flex-column justify-center">{trg}</p>
        <p className="text__prn flex-column justify-center">[ {prn} ]</p>
      </div>
      {showRevealButton ? <RevealButton /> : <ChoiceBar />}
    </div>
  );
}

Card.propTypes = {
  src: PropTypes.string.isRequired,        
  trg: PropTypes.string.isRequired, 
  prn: PropTypes.string.isRequired, 
};