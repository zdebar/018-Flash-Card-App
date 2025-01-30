import PropTypes from 'prop-types'; 
import "./Icon.css"; 


function Icon( { IconImage, style }) {
  
  if (!IconImage) {
    return null; 
  }
  
  return (
    <button className="icon">
      <IconImage style={style}/>
    </button>
  );
}

Icon.propTypes = {
  IconImage: PropTypes.elementType.isRequired,  
  style: PropTypes.object,
};

export default Icon;
