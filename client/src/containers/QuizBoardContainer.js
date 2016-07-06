import { connect } from 'react-redux';
import QuizBoard from '../components/QuizBoard';
import { getParticipants, addResultOfParticipant, addParticipant, removeParticipant, clearResults, clearResultsOfTask } from '../actions/participantsActions';
import { startTask, stopTask } from '../actions/tasksActions';
import { incTimer } from '../actions/quizActions';

function mapStateToProps(state) {
  return {
    participants: state.participants,
    auth: state.auth,
    quiz: state.quiz,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getParticipants: (token) => {
      dispatch(getParticipants(token));
    },
    addPaticipantResult: (userId, result) => {
      dispatch(addResultOfParticipant(userId, result));
    },
    addParticipant: (user) => {
      dispatch(addParticipant(user));
    },
    removeParticipant: participant => {
      dispatch(removeParticipant(participant));
    },
    startTask: (task) => {
      dispatch(startTask(task));
    },
    stopTask: () => {
      dispatch(stopTask());
    },
    incTimer: (time) => {
      dispatch(incTimer(time));
    },
    clearResults: () => {
      dispatch(clearResults());
    },
    clearResultsOfTask: taskId => {
      dispatch(clearResultsOfTask(taskId));
    },
  };
}

const QuizBoardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizBoard);

export default QuizBoardContainer;
