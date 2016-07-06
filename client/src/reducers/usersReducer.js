import constants from '../constants/actionConstants';
import { List, fromJS, Map } from 'immutable';

export default function (state = fromJS({ users: [] }), action) {
  let index;
  switch (action.type) {
    case constants.GET_USERS_SUCCESS:
      return state.set('users', fromJS(action.users));
    case constants.ADD_USER_SUCCESS:
      return state.update('users', users => users.push(fromJS(action.user))).delete('error');
    case constants.ADD_USER_FAILURE:
      return state.set('error', action.error);
    case constants.DELETE_USER_SUCCESS:
      return state.update('users', users => {
        index = users.findIndex(user => user.get('id') === action.userId);
        return users.splice(index, 1);
      }).delete('error');
    case constants.DELETE_USER_FAILURE:
      return state.set('error', action.error);
    case constants.UPDATE_USER_SUCCESS:
      index = state.get('users').findIndex(user => user.get('id') === action.user.id);
      return state.update('users', users => (
        users.update(index, user => user.mergeDeep(action.user))
      )).delete('error');
    case constants.UPDATE_USER_FAILURE:
      return state.set('error', action.error);
    default:
      return state;
  }
}
