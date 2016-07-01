import React, { PropTypes } from 'react';
import Timer from './Timer';

function QuizBoardParticipantRow(props) {
  let currentTaskResults = null;
  if (props.currentTask) {
    currentTaskResults = props.participant.get('tasksResults').find(result => (
      result.get('task') === props.currentTask.get('_id')
    ));
  }
  return (
    <tr>
      <td>{props.participant.get('user').get('username')}</td>
      <td>{currentTaskResults && <Timer>currentTaskResults.get('time')</Timer>}</td>
      <td>{currentTaskResults && currentTaskResults.get('selector').length}</td>
      {props.showSelector ?
        <td>{currentTaskResults && currentTaskResults.get('selector')}</td> :
        null
      }
    </tr>
  );
}

QuizBoardParticipantRow.propTypes = {
  participant: PropTypes.object,
  currentTask: PropTypes.object,
  showSelector: PropTypes.bool,
};

export default QuizBoardParticipantRow;
