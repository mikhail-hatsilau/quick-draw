import React, { PropTypes } from 'react';

class UserPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      role: this.props.roles.get(0).get('_id'),
      validationError: false,
    };
    this.changeEvent = this.changeEvent.bind(this);
    this.save = this.save.bind(this);
  }
  changeEvent() {
    const username = this.refs.username.value;
    const password = this.refs.password.value;
    const role = this.refs.role.value;
    this.setState({
      username,
      password,
      role,
    });
  }
  save(event) {
    event.preventDefault();
    if (this.state.username === '') {
      this.setState({
        validationError: true,
      });
      return;
    }
    if (this.state.password === '') {
      this.setState({
        validationError: true,
      });
      return;
    }
    this.props.addUser(this.state);
  }
  render() {
    const roles = this.props.roles.map(role => (
      <option value={role.get('_id')}>{role.get('name')}</option>
    ));
    return (
      <div className="layer">
        <div className="popup">
          <form onSubmit={this.save}>
            <input
              className={!this.state.username && this.state.validationError ? 'required-error' : ''}
              type="text"
              value={this.state.username}
              onChange={this.changeEvent}
              ref="username"
            />
            {!this.state.username && this.state.validationError ? <span>Please fill the username field</span> : null}
            <input
              className={!this.state.password && this.state.validationError ? 'required-error' : ''}
              type="text"
              value={this.state.password}
              onChange={this.changeEvent}
              ref="password"
            />
            {!this.state.password && this.state.validationError ? <span>Please fill the password field</span> : null}
            <select ref="role" defaultValue={this.state.role} onChange={this.changeEvent}>
              {roles}
            </select>
            <input type="submit" value="Save" />
            <button onClick={this.props.closePopup}>Close</button>
          </form>
        </div>
      </div>
    );
  }
}

UserPopup.propTypes = {
  addUser: PropTypes.func,
  roles: PropTypes.object,
  user: PropTypes.object,
  closePopup: PropTypes.func,
};

export default UserPopup;
