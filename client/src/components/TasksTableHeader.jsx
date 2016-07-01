import React, { PropTypes } from 'react';

class TasksTableHeader extends React.Component {
  constructor(props) {
    super(props);
    this.deleteTask = this.deleteTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.startTask = this.startTask.bind(this);
    this.stopTask = this.stopTask.bind(this);
  }
  deleteTask() {
    this.props.deleteTask(this.props.task.get('_id'));
  }
  editTask() {
    this.props.editTask(this.props.task);
  }
  startTask() {
    this.props.startTask(this.props.task);
  }
  stopTask() {
    this.props.stopTask(this.props.task);
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
          <button type="button" onClick={this.editTask} disabled={this.props.disabledStartButton}>Edit</button>
        <button type="button" onClick={this.deleteTask} disabled={this.props.disabledStartButton}>Remove</button>
          <button type="button" onClick={this.startTask} disabled={this.props.disabledStartButton}>Start</button>
          <button type="button" onClick={this.stopTask} disabled={this.props.disabledStopButton}>Stop</button>
        </div>
      </th>
    );
  }
}

TasksTableHeader.propTypes = {
  task: PropTypes.object,
  deleteTask: PropTypes.func,
  editTask: PropTypes.func,
  startTask: PropTypes.func,
  stopTask: PropTypes.func,
  disabledStartButton: PropTypes.bool,
  disabledStopButton: PropTypes.bool,
};

export default TasksTableHeader;
