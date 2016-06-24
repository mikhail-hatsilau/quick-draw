import { expect } from 'chai';
import { List, fromJS } from 'immutable';
import rolesReducer from '../src/reducers/rolesReducer';
import constants from '../src/constants/actionConstants';

describe('Roles reducer', () => {
  it('should have initial state', () => {
    const nextState = rolesReducer(undefined, {});
    expect(nextState).to.equal(List());
  });
  it('should add roles to the state if query is successfull', () => {
    const state = List();
    const rolesForTest = [
      {
        id: 1,
        name: 'admin',
      },
      {
        id: 2,
        name: 'participant',
      },
    ];
    const action = {
      type: constants.GET_ROLES_SUCCESS,
      roles: rolesForTest,
    };
    const nextState = rolesReducer(state, action);
    expect(state).to.equal(List());
    expect(nextState).to.equal(fromJS(rolesForTest));
  });
});
