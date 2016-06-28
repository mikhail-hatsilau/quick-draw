import { fromJS, Map } from 'immutable';
import { expect } from 'chai';
import constants from '../src/constants/actionConstants';
import quizTaskReducer from '../src/reducers/quizTaskReducer';

describe('QuizTest reducer test', () => {
  it('should has initial state', () => {
    const nextState = quizTaskReducer(undefined, {});
    expect(nextState).to.equal(Map());
  });
  it('should add task, spent time and selector properties to the state', () => {
    const state = Map();
    const action = {
      type: constants.START_TEST,
      task: {
        _id: 1,
        name: 'task1',
        code: '<a>',
        deprecatedSelectors: '*',
        answare: 0,
        timeLimit: 120,
      }
    }
    const nextState = quizTaskReducer(state, action);
    expect(state).to.equal(Map());
    expect(nextState).to.equal(fromJS({
      task: {
        _id: 1,
        name: 'task1',
        code: '<a>',
        deprecatedSelectors: '*',
        answare: 0,
        timeLimit: 120,
      },
      timeSpent: 0,
      selector: '',
    }));
  });
  it('should increment timer', () => {
    const state = fromJS({
      task: {
        _id: 1,
        name: 'task1',
        code: '<a>',
        deprecatedSelectors: '*',
        answare: 0,
        timeLimit: 120,
      },
      timeSpent: 0,
      selector: '',
    });
    const action = {
      type: constants.INC_TIMER,
      time: 1,
    };
    const nextState = quizTaskReducer(state, action);
    expect(state).to.equal(fromJS({
      task: {
        _id: 1,
        name: 'task1',
        code: '<a>',
        deprecatedSelectors: '*',
        answare: 0,
        timeLimit: 120,
      },
      timeSpent: 0,
      selector: '',
    }));
    expect(nextState).to.equal(fromJS({
      task: {
        _id: 1,
        name: 'task1',
        code: '<a>',
        deprecatedSelectors: '*',
        answare: 0,
        timeLimit: 120,
      },
      timeSpent: 1,
      selector: '',
    }));
  });
  it('should remove task information when quiz is stoped', () => {
    const state = fromJS({
      task: {
        _id: 1,
        name: 'task1',
        code: '<a>',
        deprecatedSelectors: '*',
        answare: 0,
        timeLimit: 120,
      },
      timeSpent: 35,
      selector: 'p',
    });
    const action = {
      type: constants.PASS_TEST,
    };
    const nextState = quizTaskReducer(state, action);
    expect(state).to.equal(fromJS({
      task: {
        _id: 1,
        name: 'task1',
        code: '<a>',
        deprecatedSelectors: '*',
        answare: 0,
        timeLimit: 120,
      },
      timeSpent: 35,
      selector: 'p',
    }));
    expect(nextState).to.equal(Map());
  });
  it('should update selector property in the state', () => {
    const state = fromJS({
      task: {
        _id: 1,
        name: 'task1',
        code: '<a>',
        deprecatedSelectors: '*',
        answare: 0,
        timeLimit: 120,
      },
      timeSpent: 35,
      selector: '',
    });
    const action = {
      type: constants.UPDATE_SELECTOR,
      selector: 'div',
    }
    const nextState = quizTaskReducer(state, action);
    expect(state).to.equal(fromJS({
      task: {
        _id: 1,
        name: 'task1',
        code: '<a>',
        deprecatedSelectors: '*',
        answare: 0,
        timeLimit: 120,
      },
      timeSpent: 35,
      selector: '',
    }));
    expect(nextState).to.equal(fromJS({
      task: {
        _id: 1,
        name: 'task1',
        code: '<a>',
        deprecatedSelectors: '*',
        answare: 0,
        timeLimit: 120,
      },
      timeSpent: 35,
      selector: 'div',
    }));
  });
});
