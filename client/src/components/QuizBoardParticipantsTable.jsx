import React, { PropTypes } from 'react';
import QuizBoardParticipantRow from './QuizBoardParticipantRow';
import Timer from './Timer';

class QuizBoardParticipantsTable extends React.Component {
  render() {
    const participants = this.props.participants.map(participant => {
      console.log(participant.get('highlighted'));
      return (<QuizBoardParticipantRow
        key={participant.get('_id')}
        participant={participant}
        showSelector={this.props.showSelector}
        currentTask={this.props.currentTask}
        highlight={participant.get('highlighted') || false}
      />);
    });
    return (
      <div>
        <div>Current task: {this.props.currentTask && this.props.currentTask.get('name')}</div>
        <div>
          Time spent:
          <Timer>{this.props.timeSpent}</Timer>
        </div>
        <table>
          <thead>
            <tr>
              <th>Participant</th>
              <th>Time</th>
              <th>Length of selector</th>
              {this.props.showSelector ?
                <th>Selector</th> :
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
  passedTestInfo: PropTypes.object,
};

export default QuizBoardParticipantsTable;
