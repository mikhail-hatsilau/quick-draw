import React, { PropTypes } from 'react';
import NewUserPopup from './NewUserPopup';
import EditUserPopup from './EditUserPopup';
import Popup from './Popup';
import UserItem from './UserItem';

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
    this.closePopup = this.closePopup.bind(this);
    this.showEditUserPopup = this.showEditUserPopup.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }
  componentDidMount() {
    this.props.getUsers(this.props.auth.get('token'));
    this.props.getRoles(this.props.auth.get('token'));
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
    this.setState({
      newUserPopupIsShown: false,
    });
  }
  updateUser(user) {
    this.setState({
      editUserPopupIsShown: false,
      userForEdit: null,
    });
    console.log(user);
  }
  closePopup() {
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
        token={this.props.auth.get('token')}
        showEditUserPopup={this.showEditUserPopup}
      />
    ));
    return (
      <div>
        <button onClick={this.showUserPopup}>Add</button>
        <table>
          <thead>
            <tr>
              <td>Username</td>
              <td>Role</td>
              <td />
            </tr>
          </thead>
          <tbody>
            {users}
          </tbody>
        </table>
        {this.state.newUserPopupIsShown ?
          <Popup>
            <NewUserPopup
              roles={this.props.roles}
              addUser={this.addUser}
              closePopup={this.closePopup}
            />
          </Popup> : null
        }
        {this.state.editUserPopupIsShown ?
          <Popup>
            <EditUserPopup
              roles={this.props.roles}
              updateUser={this.updateUser}
              closePopup={this.closePopup}
              user={this.state.userForEdit}
            />
          </Popup> : null
        }
      </div>
    );
  }
}

Users.propTypes = {
  auth: PropTypes.object,
  getUsers: PropTypes.func,
  getRoles: PropTypes.func,
  addUser: PropTypes.func,
  deleteUser: PropTypes.func,
  users: PropTypes.object,
  roles: PropTypes.object,
};

export default Users;
