import constants from '../constants/constants';
import { Map, fromJS } from 'immutable';

export default function authReducer(state = Map(), action) {
  switch (action.type) {
    case constants.SIGNIN_SUCCESS:
      return state.merge(fromJS({
        user: action.user,
        token: action.token,
        signedIn: true,
        shouldRedirect: true,
      })).delete('error');
    case constants.SIGNIN_FAILURE:
      return state.merge(fromJS({
        error: action.error,
        signedIn: false,
        shouldRedirect: false,
      }));
    case constants.SIGNOUT:
      return state.delete('user').delete('token').set('signedIn', false).set('shouldRedirect', false);
    case constants.AUTH:
      return state.merge(fromJS({
        user: action.user,
        token: action.token,
        shouldRedirect: false,
        signedIn: true,
      }));
    default:
      return state;
  }
}
