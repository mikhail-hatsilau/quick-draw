import authReducer from '../src/reducers/authReducer';
import { expect } from 'chai';
import { Map, fromJS } from 'immutable';
import constants from '../src/constants/constants';

describe('auth reducer', () => {
  it('should has initial state', () => {
    let state;
    const action = {};
    const nextState = authReducer(state, action);
    expect(nextState).to.equal(Map());
  });
  it('should has a user and token after sign in response', () => {
    const token = 'abc123';
    const state = fromJS({
      username: 'test',
      token: null,
    });
    const action = {
      type: constants.SIGNIN_SUCESS,
      token,
    };
    const nextState = authReducer(state, action);
    expect(state).to.equal(fromJS({
      username: 'test',
      token: null,
    }));
    expect(nextState).to.equal(fromJS({
      username: 'test',
      signedIn: true,
      shouldRedirect: true,
      token,
    }));
  });
  it('should remove user when sign out', () => {
    const state = fromJS({
      username: 'test',
      shouldRedirect: true,
      token: 'test123',
    });
    const action = {
      type: constants.SIGNOUT,
    };
    const nextState = authReducer(state, action);
    expect(state).to.equal(fromJS({
      username: 'test',
      shouldRedirect: true,
      token: 'test123',
    }));
    expect(nextState).to.equal(Map());
  });
});
