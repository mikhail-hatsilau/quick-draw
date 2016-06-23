import React, { PropTypes } from 'react';

class EditUserPopup extends React.Component {
  constructor(props) {
    super(props);
    this.saveChanges = this.saveChanges.bind(this);
    this.state = {
      username: this.props.user.get('username'),
      password: '',
      role: this.props.roles.find(role => (
        role.get('_id') === this.props.user.get('role').get('_id')
      )).get('_id'),
      validationError: '',
      changePassword: false,
    };
    this.changeEvent = this.changeEvent.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
  }
  changeEvent() {
    this.setState({
      username: this.refs.username.value,
      role: this.refs.role.value,
      changePassword: this.refs.changePassword.checked,
    });
  }
  saveChanges(event) {
    event.preventDefault();
    if (this.state.username === '') {
      this.setState({
        validationError: true,
      });
      return;
    }
    this.props.updateUser({
      id: this.props.user.get('id'),
      username: this.state.username,
      role: this.state.role,
    });
  }
  render() {
    const roles = this.props.roles.map(role => (
      <option value={role.get('_id') }>{role.get('name') }</option>
    ));
    return (
      <form onSubmit={this.saveChanges}>
        <input
          className={!this.state.username && this.state.validationError ? 'required-error' : ''}
          type="text"
          value={this.state.username}
          onChange={this.changeEvent}
          ref="username"
        />
        {!this.state.username && this.state.validationError ? <span>Please fill the username field</span> : null}
        <input
          type="checkbox"
          ref="changePassword"
          value={this.state.changePassword}
          onChange={this.changeEvent}
        />
        {this.state.changePassword ?
          <input
            className={!this.state.password && this.state.validationError ? 'required-error' : ''}
            type="text"
            value={this.state.password}
            onChange={this.changeEvent}
            ref="password"
          /> : null
        }
        <select ref="role" defaultValue={this.state.role} onChange={this.changeEvent}>
          {roles}
        </select>
        <input type="submit" value="Save" />
        <button onClick={this.props.closePopup}>Close</button>
      </form>
    );
  }
}

EditUserPopup.propTypes = {
  roles: PropTypes.object,
  closePopup: PropTypes.func,
  user: PropTypes.object,
  updateUser: PropTypes.func,
};

export default EditUserPopup;
