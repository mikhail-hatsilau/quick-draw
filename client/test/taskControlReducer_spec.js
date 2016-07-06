import { fromJS, Map } from 'immutable';
import { expect } from 'chai';
import constants from '../src/constants/actionConstants';
import taskControlReducer from '../src/reducers/taskControlReducer';

describe('Task control reducer', () => {
  it('should has initial state', () => {
    const nextState = taskControlReducer(undefined, {});
    expect(nextState).to.equal(fromJS({
      taskInProgress: false,
      currentTask: null,
      timeSpent: 0,
    }));
  });
  it('should add task to the state,set true to the property taskInProgress and set default value of timer when some task is started', () => {
    const state = fromJS({
      taskInProgress: false,
    });
    const action = {
      type: constants.START_TASK,
      task: {
        _id: 1,
        name: 'task1',
        code: '<div></div>',
        answare: 0,
        timeLimit: 120,
      },
      timeSpent: 0,
    };
    const nextState = taskControlReducer(state, action);
    expect(state).to.equal(fromJS({
      taskInProgress: false,
    }));
    expect(nextState).to.equal(fromJS({
      currentTask: {
        _id: 1,
        name: 'task1',
        code: '<div></div>',
        answare: 0,
        timeLimit: 120,
      },
      taskInProgress: true,
      timeSpent: 0,
    }));
  });
  it('should set false value to the taskInProgress property when task is stoped', () => {
    const state = fromJS({
      currentTask: {
        _id: 1,
        name: 'task1',
        code: '<div></div>',
        answare: 0,
        timeLimit: 120,
      },
      taskInProgress: true,
      timeSpent: 25,
    });
    const action = {
      type: constants.STOP_TASK,
    };
    const nextState = taskControlReducer(state, action);
    expect(state).to.equal(fromJS({
      currentTask: {
        _id: 1,
        name: 'task1',
        code: '<div></div>',
        answare: 0,
        timeLimit: 120,
      },
      taskInProgress: true,
      timeSpent: 25,
    }));
    expect(nextState).to.equal(fromJS({
      currentTask: {
        _id: 1,
        name: 'task1',
        code: '<div></div>',
        answare: 0,
        timeLimit: 120,
      },
      taskInProgress: false,
      timeSpent: 25,
    }));
  });
  it('should update timeSpent property', () => {
    const state = fromJS({
      currentTask: {
        _id: 1,
        name: 'task1',
        code: '<div></div>',
        answare: 0,
        timeLimit: 120,
      },
      taskInProgress: true,
      timeSpent: 0,
    });
    const action = {
      type: constants.INC_TIMER,
      time: 1,
    };
    const nextState = taskControlReducer(state, action);
    expect(state).to.equal(fromJS({
      currentTask: {
        _id: 1,
        name: 'task1',
        code: '<div></div>',
        answare: 0,
        timeLimit: 120,
      },
      taskInProgress: true,
      timeSpent: 0,
    }));
    expect(nextState).to.equal(fromJS({
      currentTask: {
        _id: 1,
        name: 'task1',
        code: '<div></div>',
        answare: 0,
        timeLimit: 120,
      },
      taskInProgress: true,
      timeSpent: 1,
    }));
  });
});
