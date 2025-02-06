import './Card.css';
import ChoiceBar from './ChoiceBar';
import PropTypes from 'prop-types';

export default function Card ({ src, trg, prn }) {
  return (
    <div className="card flex-column-between">      
      <div className='note flex-column-between border'>
        <p className="text__src flex-column-center">{src}</p>
        <p className="text__trg flex-column-center">{trg}</p>
        <p className="text__prn flex-column-center">[ {prn} ]</p>
      </div>
      <ChoiceBar />
    </div>
  );
}

Card.propTypes = {
  src: PropTypes.string.isRequired,        
  trg: PropTypes.string.isRequired, 
  prn: PropTypes.string.isRequired, 
};