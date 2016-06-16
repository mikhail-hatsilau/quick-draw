import React, { PropTypes } from 'react';
import UserPopup from './UserPopup';
import UserItem from './UserItem';

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userPopupIsShown: false,
    };
    this.showUserPopup = this.showUserPopup.bind(this);
    this.addUser = this.addUser.bind(this);
    this.closePopup = this.closePopup.bind(this);
  }
  componentDidMount() {
    this.props.getUsers(this.props.auth.get('token'));
    this.props.getRoles(this.props.auth.get('token'));
  }
  showUserPopup() {
    this.setState({
      userPopupIsShown: true,
    });
  }
  addUser(user) {
    this.props.addUser(user, this.props.auth.get('token'));
    this.setState({
      userPopupIsShown: false,
    });
  }
  closePopup() {
    this.setState({
      userPopupIsShown: false,
    });
  }
  render() {
    const users = this.props.users.get('users').map((user) => (
      <UserItem
        user={user}
        deleteUser={this.props.deleteUser}
        token={this.props.auth.get('token')}
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
        {this.state.userPopupIsShown ?
          <UserPopup
            roles={this.props.roles}
            addUser={this.addUser}
            closePopup={this.closePopup}
          /> : null
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
