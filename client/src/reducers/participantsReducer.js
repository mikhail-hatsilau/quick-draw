import { fromJS, List } from 'immutable';
import constants from '../constants/actionConstants';

function sortComparator(participant1, participant2) {
  const taskResults1 = participant1.get('tasksResults');
  const taskResults2 = participant2.get('tasksResults');
  if (!taskResults1.size || !taskResults2.size) {
    return taskResults2.size - taskResults1.size;
  }
  const timeSum1 = taskResults1.reduce((sum, result) => (
    sum += +result.get('time')
  ), 0);
  const timeSum2 = taskResults2.reduce((sum, result) => (
    sum += +result.get('time')
  ), 0);
  return timeSum1 - timeSum2;
}

function sortByTaskComparator(participant1, participant2, taskId) {
  const taskResults1 = participant1.get('tasksResults');
  const taskResults2 = participant2.get('tasksResults');
  const targetTask1 = taskResults1.find(r => r.get('task') === taskId);
  const targetTask2 = taskResults2.find(r => r.get('task') === taskId);
  if (!targetTask1 || !targetTask1) {
    if (!targetTask1 && targetTask2) {
      return 1;
    } else if (targetTask1 && !targetTask2){
      return -1;
    } else {
      return 0;
    }
  }
  return targetTask1.get('time') - targetTask2.get('time');
}

export default function (state = fromJS({ participants: [] }), action) {
  switch (action.type) {
    case constants.GET_PARTICIPANTS_SUCCESS:
      return state.set('participants', fromJS(action.participants));
    case constants.ADD_PARTICIPANT:
      return state.update('participants', participants => (
        participants
          .push(fromJS(action.participant))
          .sort((p1, p2) => p1.get('user').get('username').localeCompare(p2.get('user').get('username')))
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
        )).sort(sortComparator);
      });
    case constants.CLEAR_RESULTS_OF_PARTICIPANTS:
      return state.update('participants', participants => (
        participants.map(participant => (
          participant.update('tasksResults', () => List())
        ))
      ));
    case constants.CLEAR_RESULTS_OF_TASK:
      return state.update('participants', participants => (
        participants.map(participant => (
          participant.update('tasksResults', tasksResults => {
            const index = tasksResults.findIndex(result => result.get('task') === action.taskId);
            if (index !== -1) {
              return tasksResults.splice(index, 1);
            }
            return tasksResults;
          })
        ))
      ));
    case constants.HIGHLIGHT_PARTICIPANT:
      return state.update('participants', participants => (
        participants.map(participant => (
          participant.get('user').get('_id') === action.userId ? participant.set('highlighted', true) : participant
        ))
      ));
    case constants.UNHIGHLIGHT_PARTICIPANT:
      return state.update('participants', participants => (
        participants.map(participant => (
          participant.get('user').get('_id') === action.userId ? participant.delete('highlighted') : participant
        ))
      ));
    case constants.REMOVE_ALL_PARTICIPANTS:
      return state.update('participants', participants => List());
    case constants.SORT:
      return state.update('participants', participants => {
        return participants.sort((p1, p2) => {
          if (action.taskId) {
            return sortByTaskComparator(p1, p2, action.taskId)
          }
          return sortComparator(p1, p2);
        });
      });
    default:
      return state;
  }
}
