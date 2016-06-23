import React, { PropTypes } from 'react';

function Header(props, context) {
  return (
    <div className="modal-header">
      <span>{props.children}</span>
      {props.closeBtn ?
        <button className="close-modal" onClick={context.close}>Close</button> :
        null
      }
    </div>
  );
}

Header.propTypes = {
  children: PropTypes.string,
  closeBtn: PropTypes.bool,
};

Header.contextTypes = {
  close: PropTypes.func,
};

export default Header;
