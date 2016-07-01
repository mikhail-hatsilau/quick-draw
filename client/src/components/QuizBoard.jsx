import React, { PropTypes } from 'react';
import QuizBoardParticipantsTable from './QuizBoardParticipantsTable';
import io from 'socket.io-client';
import constants from '../constants/constants';

const socket = io(constants.SOCKET_HOST);

class QuizBoard extends React.Component {
  componentDidMount() {
    this.props.getParticipants(this.props.auth.get('token'));
    socket.emit('join admin', {
      user: this.props.auth.get('user'),
    });
    socket.on('start test', task => {
      this.props.startTask(task);
    });
    socket.on('participant joined', user => {
      this.props.addParticipant(user);
    });
    socket.on('participant passed test', data => {
      this.props.addPaticipantResult(data.userId, data.result);
    });
    socket.on('quiz participant left', participant => {
      this.props.removeParticipant(participant);
    });
    socket.on('stop', () => {
      this.props.stopTask();
    });
    socket.on('timer inc', time => {
      this.props.incTimer(time);
    });
    socket.on('results were cleared', () => {
      this.props.clearResults();
    });
  }
  render() {
    return (
      <QuizBoardParticipantsTable
        participants={this.props.participants.get('participants')}
        currentTask={this.props.quiz.get('currentTask')}
        showSelector={!this.props.quiz.get('taskInProgress')}
        timeSpent={this.props.quiz.get('timeSpent')}
      />
    );
  }
}

QuizBoard.propTypes = {
  participants: PropTypes.object,
  quiz: PropTypes.object,
  getParticipants: PropTypes.func,
  addParticipant: PropTypes.func,
  addPaticipantResult: PropTypes.func,
  auth: PropTypes.object,
  removeParticipant: PropTypes.func,
  startTask: PropTypes.func,
  stopTask: PropTypes.func,
  incTimer: PropTypes.func,
  clearResults: PropTypes.func,
};

export default QuizBoard;
