import React, { PropTypes } from 'react';

function Popup(props) {
  return (
    <div className="layer">
      <div className="popup">
        {props.children}
      </div>
    </div>
  );
}

Popup.propTypes = {
  children: PropTypes.element,
};

export default Popup;
