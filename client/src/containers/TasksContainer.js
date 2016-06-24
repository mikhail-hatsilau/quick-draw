import { connect } from 'react-redux';
import Tasks from '../components/Tasks';
import { getTasks, addTask, deleteTask, updateTask } from '../actions/tasksActions';
import { getParticipants } from '../actions/participantsActions';

function mapStateToProps(state) {
  return {
    auth: state.auth,
    tasks: state.tasks,
    participants: state.participants,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getTasks: (token) => {
      dispatch(getTasks(token));
    },
    addTask: (taskModel, token) => {
      dispatch(addTask(taskModel, token));
    },
    deleteTask: (taskId, token) => {
      dispatch(deleteTask(taskId, token));
    },
    updateTask: (taskId, taskModel, token) => {
      dispatch(updateTask(taskId, taskModel, token));
    },
    getParticipants: (token) => {
      dispatch(getParticipants(token));
    },
  };
}

const TasksContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Tasks);

export default TasksContainer;
