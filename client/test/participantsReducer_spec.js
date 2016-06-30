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
});
