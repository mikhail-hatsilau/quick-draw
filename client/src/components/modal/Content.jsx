import React, { PropTypes } from 'react';

function Content(props) {
  return (
    <div className="modal-content">
      {props.children}
    </div>
  );
}

Content.propTypes = {
  children: PropTypes.any,
};

export default Content;
