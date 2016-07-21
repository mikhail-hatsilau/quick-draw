import React, { PropTypes } from 'react';
import Timer from './Timer';

class QuizBoardParticipantRow extends React.Component {
  render() {
    let currentTaskResults = null;
    if (this.props.currentTask) {
      currentTaskResults = this.props.participant.get('tasksResults').find(result => (
        result.get('task') === this.props.currentTask.get('_id')
      ));
    }
    return (
      <tr className={this.props.highlight && 'highlighted'}>
        <td>{this.props.participant.get('user').get('username')}</td>
        <td>{currentTaskResults && <Timer>{currentTaskResults.get('time')}</Timer>}</td>
        <td>{currentTaskResults && currentTaskResults.get('selector').length}</td>
        {this.props.showSelector ?
          <td>{currentTaskResults && currentTaskResults.get('selector')}</td> :
          null
        }
      </tr>
    );
  }
}

QuizBoardParticipantRow.propTypes = {
  participant: PropTypes.object,
  currentTask: PropTypes.object,
  showSelector: PropTypes.bool,
  highlight: PropTypes.bool,
};

export default QuizBoardParticipantRow;
