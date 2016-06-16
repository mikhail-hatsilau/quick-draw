import authReducer from '../src/reducers/authReducer';
import { expect } from 'chai';
import { Map, fromJS } from 'immutable';
import constants from '../src/constants/constants';

describe('Auth reducer', () => {
  it('should has initial state', () => {
    let state;
    const action = {};
    const nextState = authReducer(state, action);
    expect(nextState).to.equal(Map());
  });
  it('should has a user and token after sign in response', () => {
    const token = 'abc123';
    const state = Map();
    const action = {
      type: constants.SIGNIN_SUCCESS,
      user: {
        username: 'test',
        role: {
          id: 1,
          name: 'admin',
        },
      },
      token,
    };
    const nextState = authReducer(state, action);
    expect(state).to.equal(Map());
    expect(nextState).to.equal(fromJS({
      user: {
        username: 'test',
        role: {
          id: 1,
          name: 'admin',
        },
      },
      signedIn: true,
      shouldRedirect: true,
      token,
    }));
  });
  it('should add error to the state if request is fall', () => {
    const state = Map();
    const errorMessage = 'Wrong password';
    const action = {
      type: constants.SIGNIN_FAILURE,
      error: errorMessage,
    }
    const nextState = authReducer(state, action);
    expect(state).to.equal(Map());
    expect(nextState).to.equal(fromJS({
      error: errorMessage,
      signedIn: false,
      shouldRedirect: false,
    }));
  });
  it('should remove error and add user information if signin is successfull', () => {
    const testToken = 'testToken';
    const state = fromJS({
      error: 'Validation error',
      signedIn: false,
      shouldRedirect: false,
    });
    const action = {
      type: constants.SIGNIN_SUCCESS,
      user: {
        username: 'test',
        role: {
          id: 1,
          name: 'admin',
        },
      },
      token: testToken,
    };
    const nextState = authReducer(state, action);
    expect(state).to.equal(fromJS({
      error: 'Validation error',
      signedIn: false,
      shouldRedirect: false,
    }));
    expect(nextState).to.equal(fromJS({
      user: {
        username: 'test',
        role: {
          id: 1,
          name: 'admin',
        },
      },
      token: testToken,
      signedIn: true,
      shouldRedirect: true,
    }));
  });
  it('should remove user when sign out', () => {
    const state = fromJS({
      user: {
        username: 'test',
        role: {
          id: 1,
          name: 'admin',
        },
      },
      shouldRedirect: true,
      token: 'test123',
      signedIn: true,
    });
    const action = {
      type: constants.SIGNOUT,
    };
    const nextState = authReducer(state, action);
    expect(state).to.equal(fromJS({
      user: {
        username: 'test',
        role: {
          id: 1,
          name: 'admin',
        },
      },
      shouldRedirect: true,
      token: 'test123',
      signedIn: true,
    }));
    expect(nextState).to.equal(fromJS({
      signedIn: false,
      shouldRedirect: true,
    }));
  });
  it('should add token and user to state if token exists', () => {
    const TEST_TOKEN = 'abcTest';
    const state = Map();
    const action = {
      type: constants.AUTH,
      token: TEST_TOKEN,
      user: {
        username: 'test',
        role: {
          id: 1,
          name: 'admin',
        },
      },
    };
    const nextState = authReducer(state, action);
    expect(state).to.equal(Map());
    expect(nextState).to.equal(fromJS({
      user: {
        username: 'test',
        role: {
          id: 1,
          name: 'admin',
        },
      },
      shouldRedirect: false,
      token: TEST_TOKEN,
      signedIn: true,
    }));
  });
});
