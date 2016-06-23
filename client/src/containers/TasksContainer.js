import { connect } from 'react-redux';
import Tasks from '../components/Tasks';
import { getTasks, addTask, deleteTask, updateTask } from '../actions/tasksActions';

function mapStateToProps(state) {
  return {
    auth: state.auth,
    tasks: state.tasks,
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
  };
}

const TasksContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Tasks);

export default TasksContainer;
