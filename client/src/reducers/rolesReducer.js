import { List, fromJS } from 'immutable';
import constants from '../constants/actionConstants';

export default function roleReducer(state = List(), action) {
  switch (action.type) {
    case constants.GET_ROLES_SUCCESS:
      return state.merge(fromJS(action.roles));
    default:
      return state;
  }
}
