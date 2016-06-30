import React, { PropTypes } from 'react';
import ParticipantTable from './ParticipantTable';
import TasksTable from './TasksTable';
import TaskModal from './TaskModal';
import CurrentTask from './CurrentTask';
import io from 'socket.io-client';
import constants from '../constants/constants';

const socket = io(constants.SOCKET_HOST);

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
    this.startTask = this.startTask.bind(this);
    this.stopTask = this.stopTask.bind(this);
  }
  componentDidMount() {
    const token = this.props.auth.get('token');
    this.props.getTasks(token);
    this.props.getParticipants(token);
    socket.emit('join admin', {
      user: this.props.auth.get('user'),
    });
    socket.on('participant joined', user => {
      console.log(user);
      this.props.addParticipant(user);
    });
    socket.on('timer inc', time => {
      this.props.incTimer(time);
    });
    socket.on('stop', () => {
      this.props.stopTask();
    });
    socket.on('participant passed test', data => {
      console.log(data);
      this.props.addPaticipantResult(data.userId, data.result);
    });
    socket.on('quiz participant left', participant => {
      this.props.removeParticipant(participant);
    });
  }
  componentWillUnmount() {
    socket.emit('admin left');
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
  startTask(task) {
    this.props.startTask(task);
    socket.emit('start quiz', {
      task,
    });
  }
  stopTask() {
    socket.emit('stop quiz');
  }
  render() {
    return (
      <div>
        <button type="button" onClick={this.showAddModal}>Add task</button>
        {this.props.quiz.get('taskInProgress') ?
          <CurrentTask
            task={this.props.quiz.get('currentTask')}
            timeSpent={this.props.quiz.get('timeSpent')}
          /> :
          null
        }
        <div className="tasks-table">
          <ParticipantTable
            tasks={this.props.tasks}
            participants={this.props.participants.get('participants')}
          />
          <TasksTable
            tasks={this.props.tasks.get('tasks')}
            deleteTask={this.deleteTask}
            editTask={this.editTask}
            startTask={this.startTask}
            stopTask={this.stopTask}
            participants={this.props.participants.get('participants')}
            isTaskInProgress={this.props.quiz.get('taskInProgress')}
            taskInProgress={this.props.quiz.get('currentTask')}
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
  getParticipants: PropTypes.func,
  participants: PropTypes.object,
  startTask: PropTypes.func,
  stopTask: PropTypes.func,
  quiz: PropTypes.object,
  incTimer: PropTypes.func,
  addPaticipantResult: PropTypes.func,
  addParticipant: PropTypes.func,
  removeParticipant: PropTypes.func,
};

export default Tasks;
