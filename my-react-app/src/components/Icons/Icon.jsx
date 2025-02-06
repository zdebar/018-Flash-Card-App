import PropTypes from 'prop-types'; 
import "./Icon.css"; 

export default function Icon( { IconImage, style }) {
  
  if (!IconImage) {
    return null; 
  }
  
  return (
    <button className="icon flex justify-center align-center border">
      <IconImage style={style}/>
    </button>
  );
}

Icon.propTypes = {
  IconImage: PropTypes.elementType.isRequired,  
  style: PropTypes.object,
};