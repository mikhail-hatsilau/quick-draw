import { connect } from 'react-redux';
import Tasks from '../components/Tasks';
import {
  getTasks,
  addTask,
  deleteTask,
  updateTask,
  startTask,
  stopTask } from '../actions/tasksActions';
import { incTimer } from '../actions/quizActions';
import { getParticipants, addResultOfParticipant, addParticipant, removeParticipant, clearResults, clearResultsOfTask } from '../actions/participantsActions';

function mapStateToProps(state) {
  return {
    auth: state.auth,
    tasks: state.tasks,
    participants: state.participants,
    quiz: state.quiz,
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
    startTask: (task) => {
      dispatch(startTask(task));
    },
    stopTask: () => {
      dispatch(stopTask());
    },
    incTimer: (time) => {
      dispatch(incTimer(time));
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
    clearResults: () => {
      dispatch(clearResults());
    },
    clearResultsOfTask: taskId => {
      dispatch(clearResultsOfTask(taskId));
    },
  };
}

const TasksContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Tasks);

export default TasksContainer;
