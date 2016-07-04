import React, { PropTypes } from 'react';
import io from 'socket.io-client';
import constants from '../constants/constants';

const socket = io(constants.SOCKET_HOST);

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.passTest = this.passTest.bind(this);
  }
  getChildContext() {
    return {
      passTest: this.passTest,
    };
  }
  componentDidMount() {
    socket.emit('join participant', {
      user: this.props.auth.get('user'),
    });
    socket.on('start test', task => {
      this.props.startTest(task);
      this.props.router.replace('/quizTask');
    });
    socket.on('timer inc', time => {
      this.props.incTimer(time);
    });
    socket.on('stop', () => {
      if (this.props.quizTask.get('task')) {
        this.passTest(false);
      }
    });
  }
  componentWillUnmount() {
    socket.emit('participant left', this.props.auth.get('user'));
  }
  passTest(success) {
    socket.emit('pass test', {
      user: this.props.auth.get('user'),
      task: this.props.quizTask.get('task'),
      timeSpent: +this.props.quizTask.get('timeSpent'),
      selector: this.props.quizTask.get('selector'),
      success,
    }, () => {
      this.props.router.replace('/quiz');
      this.props.passTest();
    });
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

Quiz.propTypes = {
  children: PropTypes.object,
  startTest: PropTypes.func,
  router: PropTypes.object,
  auth: PropTypes.object,
  passTest: PropTypes.func,
  quizTask: PropTypes.object,
  incTimer: PropTypes.func,
};

Quiz.childContextTypes = {
  passTest: PropTypes.func,
};

export default Quiz;
