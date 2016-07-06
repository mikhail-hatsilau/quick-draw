import React, { PropTypes } from 'react';

class ReadyToStart extends React.Component {
  render() {
    return (
      <div>Wait a bit, cowboy. We are going to start soon.</div>
    );
  }
}

ReadyToStart.propTypes = {
  auth: PropTypes.object,
  history: PropTypes.object,
};

export default ReadyToStart;

