import React, { PropTypes } from 'react';
import Form from './Form';
import TextInput from './TextInput';

class NewUserPopup extends React.Component {
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
  save(model) {
    // this.props.addUser(this.state);
    console.log(model);
  }
  render() {
    const roles = this.props.roles.map(role => (
      <option value={role.get('_id')}>{role.get('name')}</option>
    ));
    return (
      <Form validSubmit={this.save}>
        <TextInput
          name="username"
          requiredField
          errorMessage="Username is required"
          label="Username"
        />
        <input type="submit" value="Save" />
        <button onClick={this.props.closePopup}>Close</button>
      </Form>
    );
  }
}

NewUserPopup.propTypes = {
  addUser: PropTypes.func,
  roles: PropTypes.object,
  user: PropTypes.object,
  closePopup: PropTypes.func,
};

export default NewUserPopup;
