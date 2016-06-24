import React, { PropTypes } from 'react';
import { Link } from 'react-router'; 
import Form from './Form';
import Input from './Input';
import constants from '../constants/constants';

class Auth extends React.Component {
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
    if (this.props.params.action === constants.AUTH_SIGNIN_PARAM) {
      this.props.signIn(model.username, model.password);
    } else {
      this.props.signUp(model.username, model.password);
    }
  }
  render() {
    return (
      <div className="auth-block">
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
          <input
            type="submit"
            value={this.props.params.action === constants.AUTH_SIGNIN_PARAM ? 'Sign in' : 'Sign up'}
          />
        </Form>
        {this.props.params.action === constants.AUTH_SIGNIN_PARAM ?
          <div>
            Don't have an account?
            <Link to="/auth/signup">Sign up now</Link>
          </div> :
          null
        }
      </div>
    );
  }
}

Auth.propTypes = {
  signIn: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  params: PropTypes.object,
};

export default Auth;
