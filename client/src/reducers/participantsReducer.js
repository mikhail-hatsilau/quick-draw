import { fromJS } from 'immutable';
import constatnts from '../constants/actionConstants';

export default function (state = fromJS({ participants: [] }), action) {
  switch (action.type) {
    case constatnts.GET_PARTICIPANTS_SUCCESS:
      return state.set('participants', fromJS(action.participants));
    case constatnts.ADD_PARTICIPANT:
      return state.update('participants', participants => (
        participants.push(fromJS(action.participant))
      ));
    case constatnts.ADD_RESULT_OF_PARTICIPANT:
      return state.update('participants', participants => {
        const index = state.get('participants').findIndex(participant => (
          participant.get('user').get('_id') === action.userId
        ));
        return participants.update(index, participant => (
          participant.update('tasksResults', results => results.push(fromJS(action.result)))
        ));
      });
    default:
      return state;
  }
}
