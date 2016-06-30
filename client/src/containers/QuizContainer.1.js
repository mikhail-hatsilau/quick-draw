mport { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Quiz from '../components/Quiz';
import { startTest, incTimer, passTest } from '../actions/quizActions';

function mapStateToProps(state) {
  return {
    quizTask: state.quizTask,
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    startTest: (task) => {
      dispatch(startTest(task));
    },
    incTimer: (time) => {
      dispatch(incTimer(time));
    },
    passTest: () => {
      dispatch(passTest());
    }
  };
}

const QuizTaskContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz));

export default QuizTaskContainer;