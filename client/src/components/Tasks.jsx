import React, { PropTypes } from 'react';
import ParticipantTable from './ParticipantTable';
import TasksTable from './TasksTable';
import TaskModal from './TaskModal';

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTaskModal: false,
      editMode: false,
      taskForEdit: null,
    };
    this.closeModal = this.closeModal.bind(this);
    this.submitModalForm = this.submitModalForm.bind(this);
    this.showAddModal = this.showAddModal.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.editTask = this.editTask.bind(this);
  }
  componentDidMount() {
    this.props.getTasks(this.props.auth.get('token'));
  }
  showAddModal() {
    this.setState({
      showTaskModal: true,
      editMode: false,
      taskForEdit: null,
    });
  }
  closeModal() {
    this.setState({
      showTaskModal: false,
    });
  }
  submitModalForm(taskModel) {
    const token = this.props.auth.get('token');
    if (this.state.editMode) {
      this.props.updateTask(this.state.taskForEdit.get('_id'), taskModel, token);
    } else {
      this.props.addTask(taskModel, token);
    }
    this.setState({
      showTaskModal: false,
    });
  }
  deleteTask(taskId) {
    this.props.deleteTask(taskId, this.props.auth.get('token'));
  }
  editTask(task) {
    this.setState({
      showTaskModal: true,
      editMode: true,
      taskForEdit: task,
    });
  }
  render() {
    return (
      <div>
        <button type="button" onClick={this.showAddModal}>Add task</button>
        <div className="tasks-table">
          <ParticipantTable />
          <TasksTable
            tasks={this.props.tasks.get('tasks')}
            deleteTask={this.deleteTask}
            editTask={this.editTask}
          />
        </div>
        {this.state.showTaskModal ?
          <TaskModal
            closeModal={this.closeModal}
            submitModalForm={this.submitModalForm}
            editMode={this.state.editMode}
            task={this.state.taskForEdit}
          /> :
          null
        }
      </div>
    );
  }
}

Tasks.propTypes = {
  auth: PropTypes.object.isRequired,
  getTasks: PropTypes.func,
  addTask: PropTypes.func,
  deleteTask: PropTypes.func,
  updateTask: PropTypes.func,
  tasks: PropTypes.object,
};

export default Tasks;
