import React, { PropTypes } from 'react';

class ReadyToStart extends React.Component {
  render() {
    return (
      <div className="quiz-ready">
        <img src="/images/cowboy.png" alt="" />
        <span>Wait a bit, cowboy. We are going to start soon.</span>
      </div>
    );
  }
}

ReadyToStart.propTypes = {
  auth: PropTypes.object,
  history: PropTypes.object,
};

export default ReadyToStart;

