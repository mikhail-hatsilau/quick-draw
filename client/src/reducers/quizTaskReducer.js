import { fromJS, Map } from 'immutable';
import constants from '../constants/actionConstants';

export default function (state = Map(), action) {
  switch (action.type) {
    case constants.START_TEST:
      return state.mergeDeep({
        task: action.task,
        timeSpent: 0,
        selector: '',
      });
    case constants.INC_TIMER:
      return state.set('timeSpent', action.time);
    case constants.PASS_TEST:
      return state.delete('task').delete('timeSpent').delete('selector');
    case constants.UPDATE_SELECTOR:
      return state.set('selector', action.selector);
    default:
      return state;
  }
}
