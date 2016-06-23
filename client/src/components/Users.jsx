import React, { PropTypes } from 'react';
import Modal from './modal/Modal';
import UserItem from './UserItem';
import Form from './Form';
import Input from './Input';
import Select from './Select';
import NewUserModal from './NewUserModal';
import EditUserModal from './EditUserModal';

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newUserPopupIsShown: false,
      editUserPopupIsShown: false,
      userForEdit: null,
    };
    this.showUserPopup = this.showUserPopup.bind(this);
    this.addUser = this.addUser.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.showEditUserPopup = this.showEditUserPopup.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }
  componentDidMount() {
    this.props.getUsers(this.props.auth.get('token'));
    this.props.getRoles(this.props.auth.get('token'));
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.users.get('users').size > this.props.users.get('users').size) {
      this.setState({
        newUserPopupIsShown: false,
      });
    }
  }
  showUserPopup() {
    this.setState({
      newUserPopupIsShown: true,
      editUserPopupIsShown: false,
    });
  }
  showEditUserPopup(user) {
    this.setState({
      newUserPopupIsShown: false,
      editUserPopupIsShown: true,
      userForEdit: user,
    });
  }
  addUser(user) {
    this.props.addUser(user, this.props.auth.get('token'));
    // this.setState({
    //   newUserPopupIsShown: false,
    // });
  }
  updateUser(id, userModel) {
    this.props.updateUser(id, userModel, this.props.auth.get('token'));
    this.setState({
      editUserPopupIsShown: false,
      userForEdit: null,
    });
  }
  closeModal() {
    this.setState({
      newUserPopupIsShown: false,
      editUserPopupIsShown: false,
      userForEdit: null,
    });
  }
  render() {
    const users = this.props.users.get('users').map((user) => (
      <UserItem
        user={user}
        deleteUser={this.props.deleteUser}
        updateUser={this.updateUser}
        token={this.props.auth.get('token') }
        showEditUserPopup={this.showEditUserPopup}
        />
    ));
    const roles = this.props.roles.map(role => (
      {
        value: role.get('_id'),
        name: role.get('name'),
      }
    ));
    return (
      <div>
        <button onClick={this.showUserPopup}>Add</button>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Role</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {users}
          </tbody>
        </table>
        {this.state.newUserPopupIsShown ?
          <NewUserModal
            closeModal={this.closeModal}
            addUser={this.addUser}
            roles={roles}
            serverError={this.props.users.get('error')}
          /> :
          null
        }
        {this.state.editUserPopupIsShown ?
          <EditUserModal
            closeModal={this.closeModal}
            updateUser={this.updateUser}
            roles={roles}
            serverError={this.props.users.get('error')}
            user={this.state.userForEdit}
          /> :
          null
        }
      </div>
    );
  }
}

Users.propTypes = {
  auth: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired,
  getRoles: PropTypes.func.isRequired,
  addUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
  roles: PropTypes.object.isRequired,
};

export default Users;
