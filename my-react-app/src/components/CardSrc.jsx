import './CardSrc.css';
import PropTypes from 'prop-types';

function CardSrc ({ src, trg, prn }) {
  return (
    <div className="card">      
      <p className="text">{src}</p>
      <hr />
      <p className="text">{trg}</p>
      <p className="text">{prn}</p>
    </div>
  );
}

CardSrc.propTypes = {
  src: PropTypes.string.isRequired,        
  trg: PropTypes.string.isRequired, 
  prn: PropTypes.string.isRequired, 
};

export default CardSrc;