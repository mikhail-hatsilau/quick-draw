import React, { PropTypes } from 'react';
import QuizBoardParticipantRow from './QuizBoardParticipantRow';

class QuizBoardParticipantsTable extends React.Component {
  render() {
    const participants = this.props.participants.map(participant => (
      <QuizBoardParticipantRow
        key={participant.get('_id')}
        participant={participant}
        showSelector={this.props.showSelector}
        currentTask={this.props.currentTask}
      />
    ));
    return (
      <div>
        <div>Time spent: {this.props.timeSpent}</div>
        <table>
          <thead>
            <tr>
              <td>Participant</td>
              <td>Time</td>
              <td>Length of selector</td>
              {this.props.showSelector ?
                <td>Selector</td> :
                null
              }
            </tr>
          </thead>
          <tbody>
            {participants}
          </tbody>
        </table>
      </div>
    );
  }
}

QuizBoardParticipantsTable.propTypes = {
  participants: PropTypes.object,
  showSelector: PropTypes.bool,
  currentTask: PropTypes.object,
  timeSpent: PropTypes.number,
};

export default QuizBoardParticipantsTable;
