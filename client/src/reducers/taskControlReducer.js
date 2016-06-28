import { fromJS, Map } from 'immutable';
import constants from '../constants/actionConstants';

export default function (state = Map({ taskInProgress: false }), action) {
  switch (action.type) {
    case constants.START_TASK:
      return state
        .set('currentTask', fromJS(action.task))
        .set('taskInProgress', true)
        .set('timeSpent', action.timeSpent);
    case constants.STOP_TASK:
      return state
        .set('taskInProgress', false)
        .delete('currentTask')
        .delete('timeSpent');
    case constants.INC_TIMER:
      return state.set('timeSpent', action.time);
    default:
      return state;
  }
}
