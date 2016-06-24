import React, { PropTypes } from 'react';
import TasksTableHeader from './TasksTableHeader';
import TasksTableRow from './TasksTableRow';

class TasksTable extends React.Component {
  render() {
    const tasks = this.props.tasks.map(task => (
      <TasksTableHeader
        key={task.get('_id')}
        task={task}
        deleteTask={this.props.deleteTask}
        editTask={this.props.editTask}
      />
    ));
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
};

export default TasksTable;
