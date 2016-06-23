import React, { PropTypes } from 'react';
import Form from './Form';
import Input from './Input';

class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidUpdate() {
    if (this.props.auth.get('shouldRedirect')) {
      this.props.router.replace('/');
    }
  }
  handleSubmit(model) {
    this.props.signIn(model.username, model.password);
  }
  render() {
    return (
      <Form validSubmit={this.handleSubmit} serverError={this.props.auth.get('error')}>
        <Input
          name="username"
          label="Username"
          validators={['required']}
          type="text"
        />
        <Input
          name="password"
          label="Password"
          validators={['required']}
          type="password"
        />
        <input type="submit" value="Sign in" />
      </Form>
    );
  }
}

SignInForm.propTypes = {
  signIn: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
};

export default SignInForm;
