import './Card.css';
import ChoiceBar from './ChoiceBar';
import PropTypes from 'prop-types';

export default function Card ({ src, trg, prn }) {
  return (
    <div className="card">      
      <div className='note'>
        <p className="text__src">{src}</p>
        <p className="text__trg">{trg}</p>
        <p className="text__prn">[ {prn} ]</p>
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