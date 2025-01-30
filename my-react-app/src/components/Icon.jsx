import PropTypes from 'prop-types'; 
import "./Icon.css"; 


function Icon( { IconImage }) {
  
  if (!IconImage) {
    return null; // or return a default icon
  }
  
  return (
    <button className="icon">
      <IconImage />
    </button>
  );
}

Icon.propTypes = {
  IconImage: PropTypes.elementType.isRequired,  // Expecting a React component (element type)
};

export default Icon;
