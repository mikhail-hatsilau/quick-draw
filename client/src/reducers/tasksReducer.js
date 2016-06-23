import { fromJS } from 'immutable';
import constants from '../constants/constants';

function tasksReducer(state = fromJS({ tasks: [] }), action) {
  let index;
  switch (action.type) {
    case constants.GET_TASKS_SUCCESS:
      return state.set('tasks', fromJS(action.tasks));
    case constants.ADD_TASK_SUCCESS:
      return state.update('tasks', tasks => tasks.push(fromJS(action.task))).delete('error');
    case constants.ADD_TASK_FAILURE:
      return state.set('error', action.error);
    case constants.DELETE_TASK_SUCCESS:
      return state.update('tasks', tasks => {
        index = tasks.findIndex(task => task.get('_id') === action.taskId);
        return tasks.splice(index, 1);
      }).delete('error');
    case constants.DELETE_TASK_FAILURE:
      return state.set('error', action.error);
    case constants.UPDATE_TASK_SUCCESS:
      index = state.get('tasks').findIndex(task => task.get('_id') === action.task['_id']);
      return state.update('tasks', tasks => (
        tasks.update(index, task => task.mergeDeep(action.task))
      )).delete('error');
    case constants.UPDATE_TASK_FAILURE:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default tasksReducer;
