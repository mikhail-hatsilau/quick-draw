import React, { PropTypes } from 'react';

class UserItem extends React.Component {
  constructor(props) {
    super(props);
    this.deleteUser = this.deleteUser.bind(this);
    this.editUser = this.editUser.bind(this);
  }
  deleteUser() {
    const userId = this.props.user.get('id');
    this.props.deleteUser(userId, this.props.token);
  }
  editUser() {
    console.log('edit');
  }
  render() {
    return (
      <tr>
        <td>{this.props.user.get('username')}</td>
        <td>{this.props.user.get('role').get('name')}</td>
        <td>
          <button onClick={this.editUser}>Edit</button>
          <button onClick={this.deleteUser}>Remove</button>
        </td>
      </tr>
    );
  }
}

UserItem.propTypes = {
  user: PropTypes.object,
  deleteUser: PropTypes.func,
  editUser: PropTypes.func,
  token: PropTypes.string,
};

export default UserItem;
