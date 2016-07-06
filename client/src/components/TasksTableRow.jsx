import React, { PropTypes } from 'react';
import TasksTableItem from './TasksTableItem';
import Timer from './Timer';

class TasksTableRow extends React.Component {
  render() {
    const columns = this.props.tasks.map(task => {
      const resultsOfUser = this.props.participant.get('tasksResults');
      const result = resultsOfUser.find(taskResult => (
        taskResult.get('task') === task.get('_id')
      ));
      if (result) {
        return <TasksTableItem time={result.get('time')} selector={result.get('selector')} />;
      }
      return <TasksTableItem />;
    });
    const totalTime = this.props.participant.get('tasksResults')
      .reduce((total, result) => {
        total += +result.get('time');
        return total;
      }, 0);
    return (
      <tr>
        {columns}
        <td><Timer>{totalTime}</Timer></td>
      </tr>
    );
  }
}

TasksTableRow.propTypes = {
  tasks: PropTypes.object,
  participant: PropTypes.object,
};

export default TasksTableRow;
