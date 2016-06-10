import constants from '../constants/constants';
import { Map, fromJS } from 'immutable';

export default function authReducer(state = Map(), action) {
  switch (action.type) {
    case constants.SIGNIN_REQUEST:
      return state.merge(fromJS({
        username: action.username,
        token: null,
      }));
    case constants.SIGNIN_SUCESS:
      return state.merge(fromJS({
        token: action.token,
        signedIn: true,
        shouldRedirect: true,
      }));
    case constants.SIGNOUT:
      return Map();
    default:
      return state;
  }
}
