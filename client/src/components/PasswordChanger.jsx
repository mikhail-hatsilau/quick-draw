import React, { PropTypes } from 'react';
import Input from './Input';

class PasswordChanger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      checked: event.target.checked,
    });
  }
  render() {
    return (
      <div className="form-element">
        <label htmlFor="show-pass">Change Password</label>
        <input
          id="show-pass"
          type="checkbox"
          checked={this.state.checked}
          onChange={this.handleChange}
        />
        {this.state.checked ?
          <Input
            type="password"
            name="password"
            label="New password"
            validators={['required']}
          /> :
          null
        }
      </div>
    );
  }
}

export default PasswordChanger;
