import React, { PropTypes } from 'react';
import Timer from './Timer';
import classNames from 'classnames';

class QuizBoardParticipantRow extends React.Component {
  getTotalTime(participant) {
    return participant.get('tasksResults').reduce((sum, result) => (
      sum += +result.get('time')
    ), 0);
  }
  render() {
    let currentTaskResults = null;
    if (this.props.currentTask) {
      currentTaskResults = this.props.participant.get('tasksResults').find(result => (
        result.get('task') === this.props.currentTask.get('_id')
      ));
    }
    const classes = classNames('participant-row', {
      highlighted: this.props.highlight,
    });
    return (
      <tr className={classes}>
        <td>{this.props.participant.get('user').get('username')}</td>
        <td>{currentTaskResults && <Timer>{currentTaskResults.get('time')}</Timer>}</td>
        <td>{currentTaskResults && currentTaskResults.get('selector').length}</td>
        {this.props.showSelector ?
          <td>{currentTaskResults && currentTaskResults.get('selector') || '--'}</td> :
          null
        }
        <td><Timer>{this.getTotalTime(this.props.participant)}</Timer></td>
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
