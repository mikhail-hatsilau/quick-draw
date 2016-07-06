import { connect } from 'react-redux';
import ReadyForTest from '../components/ReadyForTest';

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    startTask: (task) => {
      dispatch(startTask(task));
    },
  };
}

const ReadyForTestContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReadyForTest);

export default ReadyForTestContainer;
