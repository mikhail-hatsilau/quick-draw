import React, { PropTypes } from 'react';
import TasksTableHeader from './TasksTableHeader';
import TasksTableRow from './TasksTableRow';

class TasksTable extends React.Component {
  render() {
    const tasks = this.props.tasks.map(task => {
      let disabledStartButton = false;
      let disabledStopButton = false;
      if (this.props.isTaskInProgress) {
        disabledStartButton = true;
        disabledStopButton = true;
        if (this.props.taskInProgress.get('_id') === task.get('_id')) {
          disabledStopButton = false;
        }
      }
      return (
        <TasksTableHeader
          key={task.get('_id')}
          task={task}
          deleteTask={this.props.deleteTask}
          editTask={this.props.editTask}
          startTask={this.props.startTask}
          stopTask={this.props.stopTask}
          clearResultsOfTask={this.props.clearResultsOfTask}
          disabledStartButton={disabledStartButton}
          disabledStopButton={disabledStopButton}
          sort={this.props.sort}
        />
      );
    });
    const resultsOfParticipants = this.props.participants.map(participant => (
      <TasksTableRow
        key={participant.get('_id')}
        participant={participant}
        tasks={this.props.tasks}
      />
    ));
    return (
      <div className="tasks">
        <table className="bordered-table">
          <thead>
            <tr>
              {tasks}
              <th>Total time <button onClick={() => this.props.sort()}>Sort</button></th>
            </tr>
          </thead>
          <tbody>
            {resultsOfParticipants}
          </tbody>
        </table>
      </div>
    );
  }
}

TasksTable.propTypes = {
  tasks: PropTypes.object,
  deleteTask: PropTypes.func,
  editTask: PropTypes.func,
  participants: PropTypes.object,
  startTask: PropTypes.func,
  stopTask: PropTypes.func,
  clearResultsOfTask: PropTypes.func,
  taskInProgress: PropTypes.object,
  isTaskInProgress: PropTypes.bool,
  sort: PropTypes.func,
};

export default TasksTable;
