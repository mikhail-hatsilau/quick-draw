import React, { PropTypes } from 'react';

export default function Index(props) {
  return <div>Index html</div>;
}

Index.propTypes = {
  auth: PropTypes.object,
  history: PropTypes.object,
};
