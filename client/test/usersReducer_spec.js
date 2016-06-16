import { Map, fromJS, List } from 'immutable';
import constants from '../src/constants/constants';
import usersReducer from '../src/reducers/usersReducer';
import { expect } from 'chai';

describe('Users reducer', () => {
  it('should have initial value', () => {
    const action = {};
    const nextState = usersReducer(undefined, action);
    expect(nextState).to.equal(fromJS({
      users: [],
    }));
  });
  it('should get all users and set them to the state', () => {
    const state = Map();
    const testUsers = [
      {
        id: 1,
        username: 'test',
        role: {
          id: 1,
          name: 'admin',
        },
      },
      {
        id: 2,
        username: 'test2',
        role: {
          id: 2,
          name: 'participant',
        },
      },
    ];
    const action = {
      type: constants.GET_USERS_SUCCESS,
      users: testUsers,
    };
    const nextState = usersReducer(state, action);
    expect(state).to.equal(Map());
    expect(nextState).to.equal(fromJS({
      users: testUsers,
    }));
  });
  it('should add user to the state if request is successfull', () => {
    const testUsers = [
      {
        id: 1,
        username: 'test',
        role: {
          id: 1,
          name: 'admin',
        },
      },
    ];
    const state = fromJS({
      users: testUsers,
    });
    const action = {
      type: constants.ADD_USER_SUCCESS,
      user: {
        id: 2,
        username: 'test2',
        role: {
          id: 2,
          name: 'participant',
        },
      },
    };
    const nextState = usersReducer(state, action);
    expect(state).to.equal(fromJS({
      users: testUsers,
    }));
    expect(nextState).to.equal(fromJS({
      users: [
        {
          id: 1,
          username: 'test',
          role: {
            id: 1,
            name: 'admin',
          },
        },
        {
          id: 2,
          username: 'test2',
          role: {
            id: 2,
            name: 'participant',
          },
        },
      ],
    }));
  });
  it('should remove error from the state if add user request is successfull', () => {
    const testUsers = [
      {
        id: 1,
        username: 'test',
        role: {
          id: 1,
          name: 'admin',
        },
      },
    ];
    const state = fromJS({
      users: testUsers,
      error: 'Add user error',
    });
    const action = {
      type: constants.ADD_USER_SUCCESS,
      user: {
        id: 2,
        username: 'test2',
        role: {
          id: 2,
          name: 'participant',
        },
      },
    };
    const nextState = usersReducer(state, action);
    expect(state).to.equal(fromJS({
      users: testUsers,
      error: 'Add user error',
    }));
    expect(nextState).to.equal(fromJS({
      users: [
        {
          id: 1,
          username: 'test',
          role: {
            id: 1,
            name: 'admin',
          },
        },
        {
          id: 2,
          username: 'test2',
          role: {
            id: 2,
            name: 'participant',
          },
        },
      ],
    }));
  });
  it('should has error in the state if add user request is fall', () => {
    const state = fromJS({
      users: [
        {
          id: 1,
          username: 'test1',
          role: {
            id: 2,
            name: 'participant',
          },
        },
      ],
    });
    const action = {
      type: constants.ADD_USER_FAILURE,
      error: 'Add user error',
    };
    const nextState = usersReducer(state, action);
    expect(state).to.equal(fromJS({
      users: [
        {
          id: 1,
          username: 'test1',
          role: {
            id: 2,
            name: 'participant',
          },
        },
      ],
    }));
    expect(nextState).to.equal(fromJS({
      users: [
        {
          id: 1,
          username: 'test1',
          role: {
            id: 2,
            name: 'participant',
          },
        },
      ],
      error: 'Add user error',
    }));
  });
  it('should delete user from the state if request is successfull', () => {
    const state = fromJS({
      users: [
        {
          id: 1,
          username: 'test1',
          role: {
            id: 2,
            name: 'participant',
          },
        },
      ],
    });
    const action = {
      type: constants.DELETE_USER_SUCCESS,
      userId: 1,
    };
    const nextState = usersReducer(state, action);
    expect(state).to.equal(fromJS({
      users: [
        {
          id: 1,
          username: 'test1',
          role: {
            id: 2,
            name: 'participant',
          },
        },
      ],
    }));
    expect(nextState).to.equal(fromJS({
      users: [],
    }));
  });
  it('should add error to the state if delete request is fall', () => {
    const state = fromJS({
      users: [
        {
          id: 1,
          username: 'test1',
          role: {
            id: 2,
            name: 'participant',
          },
        },
      ],
    });
    const action = {
      type: constants.DELETE_USER_FAILURE,
      error: 'Error occured',
    };
    const nextState = usersReducer(state, action);
    expect(state).to.equal(fromJS({
      users: [
        {
          id: 1,
          username: 'test1',
          role: {
            id: 2,
            name: 'participant',
          },
        },
      ],
    }));
    expect(nextState).to.equal(fromJS({
      users: [
        {
          id: 1,
          username: 'test1',
          role: {
            id: 2,
            name: 'participant',
          },
        },
      ],
      error: 'Error occured',
    }));
  });
  it('should remove error from the state if remove user request if successfull', () => {
    const state = fromJS({
      users: [
        {
          id: 1,
          username: 'test1',
          role: {
            id: 2,
            name: 'participant',
          },
        },
      ],
      error: 'Error',
    });
    const action = {
      type: constants.DELETE_USER_SUCCESS,
      userId: 1,
    };
    const nextState = usersReducer(state, action);
    expect(state).to.equal(fromJS({
      users: [
        {
          id: 1,
          username: 'test1',
          role: {
            id: 2,
            name: 'participant',
          },
        },
      ],
      error: 'Error',
    }));
    expect(nextState).to.equal(fromJS({
      users: [],
    }));
  });
});
