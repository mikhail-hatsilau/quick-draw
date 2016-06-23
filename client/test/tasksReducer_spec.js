import { Map, fromJS, List } from 'immutable';
import constants from '../src/constants/constants';
import tasksReducer from '../src/reducers/tasksReducer';
import { expect } from 'chai';

describe('Tasks reducer', () => {
  it('should have initial value', () => {
    const action = {};
    const nextState = tasksReducer(undefined, action);
    expect(nextState).to.equal(fromJS({
      tasks: [],
    }));
  });
  it('should get all tasks and set them to the state', () => {
    const state = Map();
    const testTasks = [
      {
        _id: 1,
        name: 'task1',
        code: '<div></div>',
        answare: '0',
      },
      {
        _id: 2,
        name: 'task2',
        code: '<div></div>',
        answare: '0',
      },
    ];
    const action = {
      type: constants.GET_TASKS_SUCCESS,
      tasks: testTasks,
    };
    const nextState = tasksReducer(state, action);
    expect(state).to.equal(Map());
    expect(nextState).to.equal(fromJS({
      tasks: testTasks,
    }));
  });
  it('should add task to the state if request is successfull', () => {
    const testTasks = [
      {
        _id: 1,
        name: 'task1',
        code: '<div></div>',
        answare: 0,
      },
    ];
    const state = fromJS({
      tasks: testTasks,
    });
    const action = {
      type: constants.ADD_TASK_SUCCESS,
      task: {
        _id: 2,
        name: 'task2',
        code: '<div></div>',
        answare: 1,
      },
    };
    const nextState = tasksReducer(state, action);
    expect(state).to.equal(fromJS({
      tasks: testTasks,
    }));
    expect(nextState).to.equal(fromJS({
      tasks: [
        {
          _id: 1,
          name: 'task1',
          code: '<div></div>',
          answare: 0,
        },
        {
          _id: 2,
          name: 'task2',
          code: '<div></div>',
          answare: 1,
        },
      ],
    }));
  });
  it('should remove error from the state if add task request is successfull', () => {
    const testTasks = [
      {
        _id: 1,
        name: 'task1',
        code: '<div></div>',
        answare: 1,
      },
    ];
    const state = fromJS({
      tasks: testTasks,
      error: 'Add task error',
    });
    const action = {
      type: constants.ADD_TASK_SUCCESS,
      task: {
        _id: 2,
        name: 'task2',
        code: '<div></div>',
        answare: 0,
      },
    };
    const nextState = tasksReducer(state, action);
    expect(state).to.equal(fromJS({
      tasks: testTasks,
      error: 'Add task error',
    }));
    expect(nextState).to.equal(fromJS({
      tasks: [
        {
          _id: 1,
          name: 'task1',
          code: '<div></div>',
          answare: 1,
        },
        {
          _id: 2,
          name: 'task2',
          code: '<div></div>',
          answare: 0,
        },
      ],
    }));
  });
  it('should has error in the state if add task request is fall', () => {
    const state = fromJS({
      tasks: [
        {
          _id: 1,
          name: 'task1',
          code: '<div></div>',
          answare: 0,
        },
      ],
    });
    const action = {
      type: constants.ADD_TASK_FAILURE,
      error: 'Add task error',
    };
    const nextState = tasksReducer(state, action);
    expect(state).to.equal(fromJS({
      tasks: [
        {
          _id: 1,
          name: 'task1',
          code: '<div></div>',
          answare: 0,
        },
      ],
    }));
    expect(nextState).to.equal(fromJS({
      tasks: [
        {
          _id: 1,
          name: 'task1',
          code: '<div></div>',
          answare: 0,
        },
      ],
      error: 'Add task error',
    }));
  });
  it('should remove task from the state if request is successfull', () => {
    const state = fromJS({
      tasks: [
        {
          _id: 1,
          name: 'task1',
          code: '<div></div>',
          answare: 0,
        },
      ],
    });
    const action = {
      type: constants.DELETE_TASK_SUCCESS,
      taskId: 1,
    };
    const nextState = tasksReducer(state, action);
    expect(state).to.equal(fromJS({
      tasks: [
        {
          _id: 1,
          name: 'task1',
          code: '<div></div>',
          answare: 0,
        },
      ],
    }));
    expect(nextState).to.equal(fromJS({
      tasks: [],
    }));
  });
  it('should add error to the state if delete request is fall', () => {
    const state = fromJS({
      tasks: [
        {
          _id: 1,
          name: 'task1',
          code: '<div></div>',
          answare: 0,
        },
      ],
    });
    const action = {
      type: constants.DELETE_TASK_FAILURE,
      error: 'Error occured',
    };
    const nextState = tasksReducer(state, action);
    expect(state).to.equal(fromJS({
      tasks: [
        {
          _id: 1,
          name: 'task1',
          code: '<div></div>',
          answare: 0,
        },
      ],
    }));
    expect(nextState).to.equal(fromJS({
      tasks: [
        {
          _id: 1,
          name: 'task1',
          code: '<div></div>',
          answare: 0,
        },
      ],
      error: 'Error occured',
    }));
  });
  it('should remove error from the state if remove task request if successfull', () => {
    const state = fromJS({
      tasks: [
        {
          _id: 1,
          name: 'task1',
          code: '<div></div>',
          answare: 0,
        },
      ],
      error: 'Error',
    });
    const action = {
      type: constants.DELETE_TASK_SUCCESS,
      taskId: 1,
    };
    const nextState = tasksReducer(state, action);
    expect(state).to.equal(fromJS({
      tasks: [
        {
          _id: 1,
          name: 'task1',
          code: '<div></div>',
          answare: 0,
        },
      ],
      error: 'Error',
    }));
    expect(nextState).to.equal(fromJS({
      tasks: [],
    }));
  });
  it('should update current task in the state if request is successfull', () => {
    const state = fromJS({
      tasks: [
        {
          _id: 1,
          name: 'task1',
          code: '<div></div>',
          answare: 0,
        },
      ],
    });
    const action = {
      type: constants.UPDATE_TASK_SUCCESS,
      task: {
        _id: 1,
        name: 'renamedTask1',
        code: '<div></div>',
        answare: 2,
      },
    };
    const nextState = tasksReducer(state, action);
    expect(state).to.equal(fromJS({
      tasks: [
        {
          _id: 1,
          name: 'task1',
          code: '<div></div>',
          answare: 0,
        },
      ],
    }));
    expect(nextState).to.equal(fromJS({
      tasks: [
        {
          _id: 1,
          name: 'renamedTask1',
          code: '<div></div>',
          answare: 2,
        },
      ],
    }));
  });
  it('should set error in the state if request is fall', () => {
    const state = fromJS({
      tasks: [
        {
          _id: 1,
          name: 'task1',
          code: '<div></div>',
          answare: 0,
        },
      ],
    });
    const action = {
      type: constants.UPDATE_TASK_FAILURE,
      error: 'Error',
    };
    const nextState = tasksReducer(state, action);
    expect(state).to.equal(fromJS({
      tasks: [
        {
          _id: 1,
          name: 'task1',
          code: '<div></div>',
          answare: 0,
        },
      ],
    }));
    expect(nextState).to.equal(fromJS({
      tasks: [
        {
          _id: 1,
          name: 'task1',
          code: '<div></div>',
          answare: 0,
        },
      ],
      error: 'Error',
    }));
  });
  it('should remove error in the state if it exists and request is successfull', () => {
    const state = fromJS({
      tasks: [
        {
          _id: 1,
          name: 'task1',
          code: '<div></div>',
          answare: 0,
        },
      ],
      error: 'Error',
    });
    const action = {
      type: constants.UPDATE_TASK_SUCCESS,
      task: {
        _id: 1,
        name: 'renamedTask1',
        code: '<div></div>',
        answare: 0,
      },
    };
    const nextState = tasksReducer(state, action);
    expect(state).to.equal(fromJS({
      tasks: [
        {
          _id: 1,
          name: 'task1',
          code: '<div></div>',
          answare: 0,
        },
      ],
      error: 'Error',
    }));
    expect(nextState).to.equal(fromJS({
      tasks: [
        {
          _id: 1,
          name: 'renamedTask1',
          code: '<div></div>',
          answare: 0,
        },
      ],
    }));
  });
});
