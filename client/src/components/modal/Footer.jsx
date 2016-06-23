import React, { PropTypes } from 'react';

function Footer(props) {
  return (
    <div className="modal-footer">
      {props.children}
    </div>
  );
}

Footer.propTypes = {
  children: PropTypes.array,
};

export default Footer;
