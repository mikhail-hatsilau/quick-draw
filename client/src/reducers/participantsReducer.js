import { fromJS } from 'immutable';
import constants from '../constants/actionConstants';

export default function (state = fromJS({ participants: [] }), action) {
  switch (action.type) {
    case constants.GET_PARTICIPANTS_SUCCESS:
      return state.set('participants', fromJS(action.participants));
    case constants.ADD_PARTICIPANT:
      return state.update('participants', participants => (
        participants.push(fromJS(action.participant))
      ));
    case constants.REMOVE_PARTICIPANT:
      return state.update('participants', participants => {
        const index = participants.findIndex(participant => (
          participant.get('user').get('_id') === action.participant.id
        ));
        return participants.splice(index, 1);
      });
    case constants.ADD_RESULT_OF_PARTICIPANT:
      return state.update('participants', participants => {
        let index = state.get('participants').findIndex(participant => (
          participant.get('user').get('_id') === action.userId
        ));
        return participants.update(index, participant => (
          participant.update('tasksResults', results => {
            index = results.findIndex(result => result.get('task') === action.result.task);
            if (index !== -1) {
              return results.update(index, result => result.mergeDeep(action.result));
            }
            return results.push(fromJS(action.result));
          })
        ));
      });
    default:
      return state;
  }
}
