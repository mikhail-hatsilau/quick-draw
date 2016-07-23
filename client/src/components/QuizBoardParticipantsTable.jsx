import React, { PropTypes } from 'react';
import QuizBoardParticipantRow from './QuizBoardParticipantRow';
import Timer from './Timer';

class QuizBoardParticipantsTable extends React.Component {
  render() {
    const participants = this.props.participants.map(participant => (
      <QuizBoardParticipantRow
        key={participant.get('_id')}
        participant={participant}
        showSelector={this.props.showSelector}
        currentTask={this.props.currentTask}
        highlight={participant.get('highlighted') || false}
      />
    ));
    return (
      <div className="board">
        <div className="common-info">
          <div className="current-task">Current task: <span>{this.props.currentTask && this.props.currentTask.get('name') || '--'}</span></div>
          <div className="time-spent">
            Time spent:
            <Timer>{this.props.timeSpent}</Timer>
          </div>
        </div>
        <table className="participants">
          <thead>
            <tr>
              <th>Participant</th>
              <th>Time</th>
              <th>Length of selector</th>
              {this.props.showSelector ?
                <th>Selector</th> :
                null
              }
              <th>Total time</th>
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
