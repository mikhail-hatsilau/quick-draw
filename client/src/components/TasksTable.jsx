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
    return (
      <div className="tasks">
        <table className="bordered-table">
          <thead>
            <tr>
              {tasks}
            </tr>
          </thead>
          <tbody>
            <TasksTableRow />
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
};

export default TasksTable;
