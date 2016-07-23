import React, { PropTypes } from 'react';
import QuizBoardParticipantsTable from './QuizBoardParticipantsTable';
import io from 'socket.io-client';
import constants from '../constants/constants';

const socket = io(constants.SOCKET_HOST);

class QuizBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      highlight: false,
      userId: null,
    };
  }
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
      this.props.addParticipantResult(data.userId, data.result);
      this.props.highlightParticipant(data.userId);
      setTimeout(() => {
        this.props.unhighlightParticipant(data.userId);
      }, 2000);
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
    socket.on('results of task were cleared', taskId => {
      this.props.clearResultsOfTask(taskId);
    });
    socket.on('participants were removed', () => {
      this.props.removeAllParticipants();
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
  addParticipantResult: PropTypes.func,
  auth: PropTypes.object,
  removeParticipant: PropTypes.func,
  startTask: PropTypes.func,
  stopTask: PropTypes.func,
  incTimer: PropTypes.func,
  clearResults: PropTypes.func,
  clearResultsOfTask: PropTypes.func,
  highlightParticipant: PropTypes.func,
  unhighlightParticipant: PropTypes.func,
};

export default QuizBoard;
