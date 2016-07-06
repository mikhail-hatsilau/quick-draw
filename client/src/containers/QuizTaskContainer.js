import { connect } from 'react-redux';
import QuizTask from '../components/QuizTask';
import { passTask, incTimer, updateSelector } from '../actions/quizActions';

function mapStateToProps(state) {
  return {
    quizTask: state.quizTask,
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    passTask: () => {
      dispatch(passTask());
    },
    incTimer: (time) => {
      dispatch(incTimer(time));
    },
    updateSelector: (selector) => {
      dispatch(updateSelector(selector));
    }
  };
}

const QuizTaskContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizTask);

export default QuizTaskContainer;
