import './CardSrc.css';
import PropTypes from 'prop-types';

function CardSrc ({ word, pronunciation }) {
  return (
    <div className="card">      
      <p className="text">{word}</p>
      <p className="text">{pronunciation}</p>
    </div>
  );
}

CardSrc.propTypes = {
  word: PropTypes.string.isRequired,        
  pronunciation: PropTypes.string.isRequired 
};

export default CardSrc;