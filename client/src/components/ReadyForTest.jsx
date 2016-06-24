import React, { PropTypes } from 'react';
import io from 'socket.io-client';

const socket = io();

class ReadyToStart extends React.Component {
  componentDidMount() {
    socket.emit('join participant', {
      user: this.props.auth.get('user'),
    });
  }
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

