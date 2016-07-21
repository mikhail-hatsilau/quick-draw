import { Map, fromJS, List } from 'immutable';
import constants from '../src/constants/actionConstants';
import participantsReducer from '../src/reducers/participantsReducer';
import { expect } from 'chai';

describe('Participants reducer', () => {
  it('should have initial value', () => {
    const action = {};
    const nextState = participantsReducer(undefined, action);
    expect(nextState).to.equal(fromJS({
      participants: [],
    }));
  });
  it('should get available participants and set them to the state', () => {
    const state = Map();
    const testParticipants = [
      {
        _id: 1,
        user: {
          _id: 2,
          username: 'test',
        },
        tasksResults: [
          {
            taskId: '1',
            time: 20,
            selector: '.class',
          },
        ],
      },
    ];
    const action = {
      type: constants.GET_PARTICIPANTS_SUCCESS,
      participants: testParticipants,
    };
    const nextState = participantsReducer(state, action);
    expect(state).to.equal(Map());
    expect(nextState).to.equal(fromJS({
      participants: testParticipants,
    }));
  });
  it('should add new participant in the state', () => {
    const state = fromJS({
      participants: [],
    });
    const action = {
      type: constants.ADD_PARTICIPANT,
      participant: {
        _id: 1,
        user: {
          _id: 2,
          username: 'test',
        },
        tasksResults: [
          {
            taskId: '1',
            time: 20,
            selector: '.class',
          },
        ],
      },
    };
    const nextState = participantsReducer(state, action);
    expect(state).to.equal(fromJS({
      participants: [],
    }));
    expect(nextState).to.equal(fromJS({
      participants: [{
        _id: 1,
        user: {
          _id: 2,
          username: 'test',
        },
        tasksResults: [
          {
            taskId: '1',
            time: 20,
            selector: '.class',
          },
        ],
      }],
    }));
  });
  it('should sort participants in the state by their names when the are added', () => {
    const state = fromJS({
      participants: [{
        _id: 1,
        user: {
          _id: 2,
          username: 'Btest',
        },
        tasksResults: [],
      }],
    });
    const action = {
      type: constants.ADD_PARTICIPANT,
      participant: {
        _id: 2,
        user: {
          _id: 3,
          username: 'Atest',
        },
        tasksResults: [],
      },
    };
    const nextState = participantsReducer(state, action);
    expect(state).to.equal(fromJS({
      participants: [{
        _id: 1,
        user: {
          _id: 2,
          username: 'Btest',
        },
        tasksResults: [],
      }],
    }));
    expect(nextState).to.equal(fromJS({
      participants: [{
        _id: 2,
        user: {
          _id: 3,
          username: 'Atest',
        },
        tasksResults: [],
      }, {
          _id: 1,
          user: {
            _id: 2,
            username: 'Btest',
          },
          tasksResults: [],
        }],
    }));
  });
  it('should add result to the results list of a participant', () => {
    const state = fromJS({
      participants: [{
        _id: 1,
        user: {
          _id: 2,
          username: 'test',
        },
        tasksResults: [],
      }],
    });
    const action = {
      type: constants.ADD_RESULT_OF_PARTICIPANT,
      userId: 2,
      result: {
        task: '1',
        time: 20,
        selector: '.class',
      },
    };
    const nextState = participantsReducer(state, action);
    expect(state).to.equal(fromJS({
      participants: [{
        _id: 1,
        user: {
          _id: 2,
          username: 'test',
        },
        tasksResults: [],
      }],
    }));
    expect(nextState).to.equal(fromJS({
      participants: [{
        _id: 1,
        user: {
          _id: 2,
          username: 'test',
        },
        tasksResults: [
          {
            task: '1',
            time: 20,
            selector: '.class',
          },
        ],
      }],
    }));
  });
  it('should sort participants by their results when they are updated', () => {
    const state = fromJS({
      participants: [{
        _id: 2,
        user: {
          _id: 2,
          username: 'Btest',
        },
        tasksResults: [],
      }, {
        _id: 1,
        user: {
          _id: 1,
          username: 'Ctest',
        },
        tasksResults: [{
          task: '1',
          time: 10,
          selector: '.list',
        }],
      }],
    });
    const action = {
      type: constants.ADD_RESULT_OF_PARTICIPANT,
      userId: 2,
      result: {
        task: '1',
        time: 20,
        selector: '.list',
      },
    };
    const nextState = participantsReducer(state, action);
    expect(state).to.equal(fromJS({
      participants: [{
        _id: 2,
        user: {
          _id: 2,
          username: 'Btest',
        },
        tasksResults: [],
      }, {
        _id: 1,
        user: {
          _id: 1,
          username: 'Ctest',
        },
        tasksResults: [{
          task: '1',
          time: 10,
          selector: '.list',
        }],
      }],
    }));
    expect(nextState).to.equal(fromJS({
      participants: [{
        _id: 1,
        user: {
          _id: 1,
          username: 'Ctest',
        },
        tasksResults: [{
          task: '1',
          time: 10,
          selector: '.list',
        }],
      }, {
        _id: 2,
        user: {
          _id: 2,
          username: 'Btest',
        },
        tasksResults: [{
          task: '1',
          time: 20,
          selector: '.list',
        }],
      }],
    }));
  });
  it('should put participant in the end of list if he has no results', () => {
    const state = fromJS({
      participants: [{
        _id: 2,
        user: {
          _id: 2,
          username: 'Btest',
        },
        tasksResults: [],
      }, {
        _id: 1,
        user: {
          _id: 1,
          username: 'Ctest',
        },
        tasksResults: [],
      }],
    });
    const action = {
      type: constants.ADD_RESULT_OF_PARTICIPANT,
      userId: 1,
      result: {
        task: '1',
        time: 20,
        selector: '.list',
      },
    };
    const nextState = participantsReducer(state, action);
    expect(state).to.equal(fromJS({
      participants: [{
        _id: 2,
        user: {
          _id: 2,
          username: 'Btest',
        },
        tasksResults: [],
      }, {
        _id: 1,
        user: {
          _id: 1,
          username: 'Ctest',
        },
        tasksResults: [],
      }],
    }));
    expect(nextState).to.equal(fromJS({
      participants: [{
        _id: 1,
        user: {
          _id: 1,
          username: 'Ctest',
        },
        tasksResults: [{
          task: '1',
          time: 20,
          selector: '.list',
        }],
      }, {
        _id: 2,
        user: {
          _id: 2,
          username: 'Btest',
        },
        tasksResults: [],
      }],
    }));
  });
  it('should update a result if it exists', () => {
    const state = fromJS({
      participants: [{
        _id: 1,
        user: {
          _id: 2,
          username: 'test',
        },
        tasksResults: [
          {
            task: '1',
            time: 20,
            selector: '.class',
          },
        ],
      }],
    });
    const action = {
      type: constants.ADD_RESULT_OF_PARTICIPANT,
      userId: 2,
      result: {
        task: '1',
        time: 10,
        selector: '.class',
      },
    };
    const nextState = participantsReducer(state, action);
    expect(state).to.equal(fromJS({
      participants: [{
        _id: 1,
        user: {
          _id: 2,
          username: 'test',
        },
        tasksResults: [
          {
            task: '1',
            time: 20,
            selector: '.class',
          },
        ],
      }],
    }));
    expect(nextState).to.equal(fromJS({
      participants: [{
        _id: 1,
        user: {
          _id: 2,
          username: 'test',
        },
        tasksResults: [
          {
            task: '1',
            time: 10,
            selector: '.class',
          },
        ],
      }],
    }));
  });
  it('should remove participant from the state', () => {
    const state = fromJS({
      participants: [{
        _id: 1,
        user: {
          _id: 2,
          username: 'test',
        },
        tasksResults: [
          {
            task: '1',
            time: 20,
            selector: '.class',
          },
        ],
      }],
    });
    const action = {
      type: constants.REMOVE_PARTICIPANT,
      participant: {
        _id: 1,
        user: {
          id: 2,
          username: 'test',
        },
      },
    };
    const nextState = participantsReducer(state, action);
    expect(state).to.equal(fromJS({
      participants: [{
        _id: 1,
        user: {
          _id: 2,
          username: 'test',
        },
        tasksResults: [
          {
            task: '1',
            time: 20,
            selector: '.class',
          },
        ],
      }],
    }));
    expect(nextState).to.equal(fromJS({
      participants: [],
    }));
  });
  it('should remove results of participants from the state', () => {
    const state = fromJS({
      participants: [{
        _id: 1,
        user: {
          _id: 2,
          username: 'test',
        },
        tasksResults: [
          {
            task: '1',
            time: 20,
            selector: '.class',
          },
        ],
      }, {
        _id: 2,
        user: {
          _id: 2,
          username: 'test1',
        },
        tasksResults: [
          {
            task: '1',
            time: 50,
            selector: '.class',
          },
        ],
      }],
    });
    const action = {
      type: constants.CLEAR_RESULTS_OF_PARTICIPANTS,
    };
    const nextState = participantsReducer(state, action);
    expect(state).to.equal(fromJS({
      participants: [{
        _id: 1,
        user: {
          _id: 2,
          username: 'test',
        },
        tasksResults: [
          {
            task: '1',
            time: 20,
            selector: '.class',
          },
        ],
      }, {
        _id: 2,
        user: {
          _id: 2,
          username: 'test1',
        },
        tasksResults: [
          {
            task: '1',
            time: 50,
            selector: '.class',
          },
        ],
      }],
    }));
    expect(nextState).to.equal(fromJS({
      participants: [{
        _id: 1,
        user: {
          _id: 2,
          username: 'test',
        },
        tasksResults: [],
      }, {
        _id: 2,
        user: {
          _id: 2,
          username: 'test1',
        },
        tasksResults: [],
      }],
    }));
  });
  it('should remove results of current task from the state', () => {
    const state = fromJS({
      participants: [{
        _id: 1,
        user: {
          _id: 2,
          username: 'test',
        },
        tasksResults: [
          {
            task: 1,
            time: 20,
            selector: '.class',
          },
          {
            task: 2,
            time: 10,
            selector: '.item',
          },
        ],
      }, {
        _id: 2,
        user: {
          _id: 2,
          username: 'test1',
        },
        tasksResults: [
          {
            task: 1,
            time: 50,
            selector: '.class',
          },
        ],
      }],
    });
    const action = {
      type: constants.CLEAR_RESULTS_OF_TASK,
      taskId: 1,
    };
    const nextState = participantsReducer(state, action);
    expect(state).to.equal(fromJS({
      participants: [{
        _id: 1,
        user: {
          _id: 2,
          username: 'test',
        },
        tasksResults: [
          {
            task: 1,
            time: 20,
            selector: '.class',
          },
          {
            task: 2,
            time: 10,
            selector: '.item',
          },
        ],
      }, {
        _id: 2,
        user: {
          _id: 2,
          username: 'test1',
        },
        tasksResults: [
          {
            task: 1,
            time: 50,
            selector: '.class',
          },
        ],
      }],
    }));
    expect(nextState).to.equal(fromJS({
      participants: [{
        _id: 1,
        user: {
          _id: 2,
          username: 'test',
        },
        tasksResults: [
          {
            task: 2,
            time: 10,
            selector: '.item',
          },
        ],
      }, {
        _id: 2,
        user: {
          _id: 2,
          username: 'test1',
        },
        tasksResults: [],
      }],
    }));
  });
  it('should set highlight to true when user passed a task', () => {
    const state = fromJS({
      participants: [{
        _id: 1,
        user: {
          _id: 2,
          username: 'test',
        },
        tasksResults: [
          {
            task: 1,
            time: 20,
            selector: '.class',
          },
        ],
      }, {
        _id: 2,
        user: {
          _id: 3,
          username: 'test1',
        },
        tasksResults: [
          {
            task: 1,
            time: 50,
            selector: '.class',
          },
        ],
      }],
    });
    const action = {
      type: constants.HIGHLIGHT_PARTICIPANT,
      userId: 2,
    };
    const nextState = participantsReducer(state, action);
    expect(state).to.equal(fromJS({
      participants: [{
        _id: 1,
        user: {
          _id: 2,
          username: 'test',
        },
        tasksResults: [
          {
            task: 1,
            time: 20,
            selector: '.class',
          },
        ],
      }, {
        _id: 2,
        user: {
          _id: 3,
          username: 'test1',
        },
        tasksResults: [
          {
            task: 1,
            time: 50,
            selector: '.class',
          },
        ],
      }],
    }));
    expect(nextState).to.equal(fromJS({
      participants: [{
        _id: 1,
        user: {
          _id: 2,
          username: 'test',
        },
        tasksResults: [
          {
            task: 1,
            time: 20,
            selector: '.class',
          },
        ],
        highlighted: true,
      }, {
        _id: 2,
        user: {
          _id: 3,
          username: 'test1',
        },
        tasksResults: [
          {
            task: 1,
            time: 50,
            selector: '.class',
          },
        ],
      }],
    }));
  });
  it('should remove highlight property', () => {
    const state = fromJS({
      participants: [{
        _id: 1,
        user: {
          _id: 2,
          username: 'test',
        },
        tasksResults: [
          {
            task: 1,
            time: 20,
            selector: '.class',
          },
        ],
        highlighted: true,
      }, {
        _id: 2,
        user: {
          _id: 3,
          username: 'test1',
        },
        tasksResults: [
          {
            task: 1,
            time: 50,
            selector: '.class',
          },
        ],
      }],
    });
    const action = {
      type: constants.UNHIGHLIGHT_PARTICIPANT,
      userId: 2,
    };
    const nextState = participantsReducer(state, action);
    expect(state).to.equal(fromJS({
      participants: [{
        _id: 1,
        user: {
          _id: 2,
          username: 'test',
        },
        tasksResults: [
          {
            task: 1,
            time: 20,
            selector: '.class',
          },
        ],
        highlighted: true,
      }, {
        _id: 2,
        user: {
          _id: 3,
          username: 'test1',
        },
        tasksResults: [
          {
            task: 1,
            time: 50,
            selector: '.class',
          },
        ],
      }],
    }));
    expect(nextState).to.equal(fromJS({
      participants: [{
        _id: 1,
        user: {
          _id: 2,
          username: 'test',
        },
        tasksResults: [
          {
            task: 1,
            time: 20,
            selector: '.class',
          },
        ],
      }, {
        _id: 2,
        user: {
          _id: 3,
          username: 'test1',
        },
        tasksResults: [
          {
            task: 1,
            time: 50,
            selector: '.class',
          },
        ],
      }],
    }));
  });
});
