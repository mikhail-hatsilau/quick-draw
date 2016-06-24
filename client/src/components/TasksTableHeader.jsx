import React, { PropTypes } from 'react';

class TasksTableHeader extends React.Component {
  constructor(props) {
    super(props);
    this.deleteTask = this.deleteTask.bind(this);
    this.editTask = this.editTask.bind(this);
  }
  deleteTask() {
    this.props.deleteTask(this.props.task.get('_id'));
  }
  editTask() {
    this.props.editTask(this.props.task);
  }
  render() {
    return (
      <th>
        <div>
          <div className="task-name">
            <div>{this.props.task.get('name')}</div>
          </div>
          <div className="task-info">
            <div>
              <div>Time</div>
            </div>
            <div>
              <div>Selector</div>
            </div>
          </div>
        </div>
        <div className="task-controls">
          <button type="button" onClick={this.editTask}>Edit</button>
          <button type="button" onClick={this.deleteTask}>Remove</button>
        </div>
      </th>
    );
  }
}

TasksTableHeader.propTypes = {
  task: PropTypes.object,
  deleteTask: PropTypes.func,
  editTask: PropTypes.func,
};

export default TasksTableHeader;
